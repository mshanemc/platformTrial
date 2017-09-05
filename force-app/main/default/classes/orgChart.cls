public with sharing class orgChart {

	public string getAll(){
		return JSON.serialize([select id, FirstName, LastName, Email, Phone, Title, ManagerId from user]);
	}

	public string getData(id userId) {
		//default if none given
		if (userId==null){
			userId = userInfo.getUserId();
		}

		OrgChartStructure OCS = new OrgChartStructure();

		user ThisUser = getById(userId);

		//add the current user
		OCS.me = ThisUser;
		//add their direct reports
		OCS.directs.addAll(getByManager(userId));

		//keep crawling up until you get to someone with no boss.  gives you a reverse order
		while (ThisUser.ManagerId!=null){
			ThisUser = getById(ThisUser.ManagerId);
			OCS.managers.add(ThisUser);
		}

		return JSON.serialize(OCS);
	}

	public static user getById (id userId){
		return [select id, FirstName, LastName, Email, Phone, Title, ManagerId from user where id =:userId];
	}

	public static list<user> getByManager (id managerId){
		return [select id, FirstName, LastName, Email, Phone, Title, ManagerId from user where ManagerId =:managerId];
	}

	public class OrgChartStructure {
		public user me {get;set;}
		public list<user> managers {get;set;}
		public list<user> directs {get;set;}

	}


}