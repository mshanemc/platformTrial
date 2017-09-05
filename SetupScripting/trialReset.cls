list<Path_Activity__c> PAs = [select Id, Completed__c from Path_Activity__c];

for (Path_Activity__c PA:PAs){
	PA.Completed__c = false;
}

Update PAs;

list<Walkthrough__c> Ws = [select Id, Completed__c from Walkthrough__c];

for (Walkthrough__c W:Ws){
	W.Completed__c = false;
}

Update Ws;


