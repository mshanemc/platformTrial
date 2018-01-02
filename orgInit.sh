#!/bin/bash
echo 'Creating a scratch org'
sfdx force:org:create -s -f config/project-scratch-def.json -d 1
echo 'Pushing source to the scratch org'
sfdx force:source:push

sfdx force:user:permset:assign -n TrialAdmin

sfdx force:user:create -f config/userDef/cloudy-user-def.json && sfdx msm:user:photo -f assets/cloudy-profile.png -l Cloudy &
sfdx force:user:create -f config/userDef/codey-user-def.json && sfdx msm:user:photo -f assets/codey-profile.png  -l CodeBear &
sfdx force:user:create -f config/userDef/astro-user-def.json && sfdx msm:user:photo -f assets/astro-profile.png  -l Nomical &

sfdx force:apex:execute -f SetupScripting/apexDeletions.cls
sfdx force:data:tree:import -p data/masterImportPlan.json
sfdx force:apex:execute -f SetupScripting/urlSetup.cls &
sfdx force:apex:execute -f SetupScripting/dateAdjustments.cls &
sfdx msm:user:password:set -l User -g User -p sfdx1234
sfdx force:org:open -p one/one.app#/n/Start