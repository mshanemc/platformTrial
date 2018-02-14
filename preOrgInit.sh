sfdx force:org:create -s -f config/project-scratch-def.json -d 1 -v prehub
sfdx force:source:push

sfdx force:user:permset:assign -n TrialAdmin
sfdx force:apex:execute -f SetupScripting/apexDeletions.cls
sfdx force:data:tree:import -p data/masterImportPlan.json
sfdx force:org:open -p one/one.app#/n/Start

sfdx force:apex:execute -f SetupScripting/urlSetup.cls &
sfdx force:apex:execute -f SetupScripting/dateAdjustments.cls &

sfdx force:mdapi:deploy -f zippedMDAPI/recruiting.zip -w 20
sfdx force:user:permset:assign -n Referrals && sfdx force:data:bulk:upsert -f data/referrals.csv -s Referral__c -i Id &

sfdx force:user:create -f config/userDef/cloudy-user-def.json && sfdx msm:user:photo -f assets/cloudy-profile.png -l Cloudy &
sfdx force:user:create -f config/userDef/codey-user-def.json && sfdx msm:user:photo -f assets/codey-profile.png  -l CodeBear &
sfdx force:user:create -f config/userDef/astro-user-def.json && sfdx msm:user:photo -f assets/astro-profile.png  -l Nomical &

# error handler, dependency for inspections
sfdx force:package:install -i 04t6A000001QxsjQAC -w 20
sfdx force:mdapi:deploy -f zippedMDAPI/inspections.zip -w 20
sfdx force:user:permset:assign -n Inspections
sfdx force:apex:execute -f SetupScripting/sampleCreation.cls