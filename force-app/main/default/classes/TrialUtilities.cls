public with sharing class TrialUtilities {

	@AuraEnabled
	public static string getUserId() {
		return UserInfo.getUserId();
	}

	@AuraEnabled
	public static string getTrialActivityId(){
		Trial_Activity__c TA = [select id, Current_Step__c from Trial_Activity__c][0];
		//if there isn't a current step, we'll set it to the default one
		if (TA.Current_Step__c == null){
			Path_Activity__c PA = [select Id from Path_Activity__c where Path_Sequence__c = 1];
			TA.Current_Step__c = PA.Id;
			update TA;
		}
		return TA.Id;
	}

	@AuraEnabled
	public static list<Walkthrough__c> getWalkthroughsByActivity(id activityId){
		return [select Id, Name, BodyText__c, CSS__c, Header__c, Open_on_RecordId__c, Open_on_URL__c,
			Next_Button_Action_Override__c, Next_Button_Label__c, Selector__c, Sequence__c, Show_Close_Button__c, Show_Next_Button__c, Close_Message__c
			from Walkthrough__c
			where Activity__c =: activityId and Completed__c = false
			order by Sequence__c ASC];
	}

	@AuraEnabled
	public static list<Walkthrough__c> getWalkthroughsByGrouping(string manualGrouping){
		return [select Id, Name, BodyText__c, CSS__c, Header__c, Open_on_RecordId__c, Open_on_URL__c,
			Next_Button_Action_Override__c, Next_Button_Label__c, Selector__c, Sequence__c, Show_Close_Button__c, Show_Next_Button__c, Close_Message__c
			from Walkthrough__c
			where Manual_Grouping__c =: manualGrouping and Completed__c = false
			order by Sequence__c ASC];
	}

}