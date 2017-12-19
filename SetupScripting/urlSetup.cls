list<Mission__c> missions = [ select Id from Mission__c where name like '%HQ%'];


list<Path_Activity__c> paths = [select id, Name, Close_Url__c from Path_Activity__c];
for (Path_Activity__c pa:paths){
	if (pa.Name == 'Global Search'){
		list<account> nycs = [ select Id from account where name like '%New York%'];
		pa.Close_URL__c = nycs[0].Id;
	}
	if (pa.Name == 'Standard and Custom Objects'){
		pa.Close_URL__c = missions[0].Id;
	}
}

update paths;

// update the url for the app builder button
// original https://efficiency-java-5690-dev-ed.lightning.force.com/visualEditor/appBuilder.app?pageId=Mission_Record_Page&recordId=a0254000001ABuNAAW&cloneable=true&retUrl=https%3A%2F%2Fefficiency-java-5690-dev-ed.lightning.force.com%2Fone%2Fone.app%23%2FsObject%2Fa0254000001ABuNAAW%2Fview

string appBuilderUrl = '/visualEditor/appBuilder.app?pageId=Mission_Record_Page&recordId=' + missions[0].Id + '&cloneable=true';
string oldURL = 'https://www.appbuilder.com';
system.debug(appBuilderUrl);

list<Path_Activity__c> PAList = [select id, Requirements__c from Path_Activity__c where Name = 'Customize Your App With Lightning App Builder and Components'];
system.debug(PAList[0].Requirements__c);
PAList[0].Requirements__c = PAList[0].Requirements__c.replace(oldURL, appBuilderUrl);

update PAList;