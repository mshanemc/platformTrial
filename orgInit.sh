#!/bin/bash
sfdx force:org:create -s -f config/project-scratch-def.json -d 1
sfdx force:source:push
sfdx force:user:permset:assign -n TrialAdmin
sfdx force:user:create -f config/userDef/cloudy-user-def.json
sfdx force:user:create -f config/userDef/codey-user-def.json
sfdx force:user:create -f config/userDef/astro-user-def.json

sfdx msm:user:photo -f assets/cloudy-profile.png -l Cloudy
sfdx msm:user:photo -f assets/codey-profile.png  -l CodeBear
sfdx msm:user:photo -f assets/astro-profile.png  -l Nomical

sfdx force:apex:execute -f SetupScripting/apexDeletions.cls
sfdx force:data:tree:import -p data/masterImportPlan.json
sfdx force:apex:execute -f SetupScripting/urlSetup.cls
sfdx force:org:open -p one/one.app#/n/Start