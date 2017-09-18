public with sharing class StepTests {

	public static final string MissionId = 'a02f4000000i50UAAQ';
	//public static final	id articleId = 'ka0f4000000dJfoAAE';
	public static final id sanFrancisco = '001f40000052ulGAAQ';

	//TODO: guide says "one of our upcoming volunteering events" but the test is much more specific!
	public static final id volunteerEvent = 'a06f4000000tg24AAA';

	public static void reset(){

		//sfmayor
		list<contact> matches = [select id, firstname, lastname, mobilephone, email, accountId from contact where firstname = 'Ed' and lastname = 'Lee'];
		delete matches;

		//heroes
		delete [select id from Assignment__c where Mission__c =:MissionId];

		//equipment
		delete [select id from Equipment_Needed__c where Mission__c =:MissionId];

		list<Path_Activity__c> PAs = [select id, Completed__c from Path_Activity__c];
		for (Path_Activity__c pa:PAs){
			pa.Completed__c = false;
		}
		update PAs;

		Trial_Activity__c ta = [select id, Current_Step__c from Trial_Activity__c];
		//TODO: make this based on your chosen path
		ta.Current_Step__c = 'a01f4000002eAuzAAE';
		update ta;

		//chatter on mission
		list<Assignment__c> assignments = [select id from Assignment__c];
		delete [select id from feedItem where parentId =: MissionId or parentId in: assignments];

		//remove feeditems
		delete [select id from feedItem where Type='QuestionPost' or parentId =: volunteerEvent];

		//remove volunteer event signup
		delete [select id from Volunteers__c where Event__c =: volunteerEvent and createdById =: UserInfo.GetUserId()];
	}

	@AuraEnabled
	public static Boolean noTest(){
		nextTask();
		return true;
	}

	@AuraEnabled
	public static boolean checkEquipment(){
		list<Equipment_Needed__c> needed = [select Id, Quantity__c, Equipment__r.Name__c from Equipment_Needed__c where Mission__c =: MissionId];
		system.assert(!(needed.size()<3), 'There should be 3 pieces of equipment assigned');

		for (Equipment_Needed__c e:needed){
			if (e.Equipment__r.Name__c == 'Binoculars'){
				if (e.Quantity__c != 2){
					throw new AuraHandledException('Doesn\'t look right.  Check the number of Binoculars');
				}
			} else if (e.Equipment__r.Name__c == 'Granola Bars'){
				if (e.Quantity__c != 5){
					throw new AuraHandledException('Doesn\'t look right.  Check the number of Granola Bars');
				}
			} else if (e.Equipment__r.Name__c == 'Grappling Hooks'){
				if (e.Quantity__c != 3){
					throw new AuraHandledException('Doesn\'t look right.  Check the number of Grappling Hooks');
				}
				//system.assert(e.Quantity__c == 3, 'Doesn\'t look right.  Check the number of Grappling Hooks');
			} else {
				throw new AuraHandledException('Hey!  We\'re running a scrappy, lean organization here.  No unauthorized requisitions like ' + e.Equipment__r.Name__c);
				//system.assert(false, 'Hey!  We\'re running a scrappy, lean organization here.  No unauthorized requisitions like ' + e.Equipment__r.Name__c);
			}
		}
		nextTask();
		return true;
	}

	@AuraEnabled
	public static boolean checkHeroes(){
			list<Assignment__c> heroes = [select id from Assignment__c where Mission__c =: MissionId];
			if (heroes.size() < 2){
				throw new AuraHandledException('You need to assign at least 2 heroes to the mission');
			}
			//system.assert(heroes.size() >=2, 'You need to assign at least 2 heroes to the mission');
			nextTask();
			return true;
	}

	@AuraEnabled
	public static boolean checkSFmayor() {

		list<contact> matches = [select id, firstname, lastname, mobilephone, email, accountId from contact where firstname = 'Ed' and lastname = 'Lee'];
		//system.assert(matches.size() > 0, 'You don\'t have a contact named Ed Lee created');
		if (matches.size() ==0){
			throw new AuraHandledException('You don\'t have a contact named Ed Lee created');
		}
		contact c = matches[0];

		//system.assert(c.accountId == sanFrancisco, 'You have Ed Lee as a contact, but not at the right Account (City of San Francisco)');
		if (c.AccountId != sanFrancisco){
			throw new AuraHandledException('You have Ed Lee as a contact, but not at the right Account (City of San Francisco)');
		}

		//at this point, we're good!
		nextTask();
		return true;

	}

	@AuraEnabled
	public static boolean checkArticleQuestion(){

		//TODO: search for article by name/id, then view it's feed
		list<feeditem> questions = [select id from feeditem where type='QuestionPost' and NetworkScope !=null];
		if (questions.size()==0){
			throw new AuraHandledException('There doesn\'t seem to be a question posted in the community');
		}
		//system.assert(questions.size()>0, 'There doesn\'t seem to be a question posted in the community');
		nextTask();
		return true;

	}

	@AuraEnabled
	public static boolean checkVolunteer(){

		//check that there's a volunteer event signup from the current user
		list<Volunteers__c> vols = [select id from volunteers__c where Event__c =: volunteerEvent and createdById =: UserInfo.GetUserId()];
		//system.assert(vols.size()>0, 'It doesn\'t look like you signed up yet.');
		if (vols.size()==0){
			throw new AuraHandledException('It doesn\'t look like you signed up yet.');
		}

		//check that there's a post on the event from the current user
		list<FeedItem> posts = [select id from feeditem where ParentId =: volunteerEvent and createdById =: UserInfo.GetUserId()];
		//system.assert(posts.size()>0, 'It doesn\'t look like you posted a message on the event');
		if (posts.size()==0){
			throw new AuraHandledException('It doesn\'t look like you posted a message on the event');
		}
		nextTask();
		return true;

	}


	public static void nextTask(){
		Trial_Activity__c ta = [select id, Current_Step__c from Trial_Activity__c];

		Path_Activity__c paNow = [select id, Completed__c, Path_Sequence__c, Path_Name__c from Path_Activity__c where id =:ta.Current_Step__c];
		if (paNow != null){
			paNow.Completed__c = true;
			update paNow;
		}

		list<Path_Activity__c> paNext = [select id, Path_Sequence__c, Path_Name__c
			from Path_Activity__c
			where Path_Sequence__c =:paNow.Path_Sequence__c+1
				and Path_Name__c =: paNow.Path_Name__c
			order By Path_Sequence__c ASC];

		if (paNext.size()==0){
			//then we're done!
			PaNext = [select Id from Path_Activity__c where Name = 'Complete'];
		}

		ta.Current_Step__c = paNext[0].Id;
		update ta;
	}
}