list<Trial_Activity__c> TAs = [select id, Current_Step__c,
				Path_Mobile__c, Path_Build_Apps__c, Path_IT_Tools__c, Path_See_Apps__c,
				Paths_Chosen__c, Questionnaire_Completed__c, Story_Introduced__c, Video_Watched__c, WelcomeViewed__c
				from Trial_Activity__c ];

for (Trial_Activity__c TA:TAs){
	TA.Path_Mobile__c = false;
	TA.Path_Build_Apps__c = false;
	TA.Path_IT_Tools__c = false;
	TA.Path_See_Apps__c = false;
	TA.Paths_Chosen__c = false;
	TA.Questionnaire_Completed__c = false;
	TA.Story_Introduced__c = false;
	TA.Video_Watched__c = false;
	TA.WelcomeViewed__c = false;
	TA.Current_Step__c = null;
}

update TAs;

list<Path_Activity__c> PAs = [select Id, Completed__c from Path_Activity__c];

for (Path_Activity__c PA:PAs){
	PA.Completed__c = false;
	PA.Assigned__c = false;
}

Update PAs;

list<Walkthrough__c> Ws = [select Id, Completed__c from Walkthrough__c];

for (Walkthrough__c W:Ws){
	W.Completed__c = false;
}

Update Ws;

StepTests.reset();


