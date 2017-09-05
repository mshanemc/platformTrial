#!/bin/bash

## variables
org=$1

LNinstalled='y' ##hardcoded for now
##TODO: verify that an org was identified, or default to sfdx default

## Run this after creating the org and enabling Lightning Knowledge
## echo 'You did push the source and install Lightning Knowledge, right? (y/n)'
## read LNinstalled

if [ $LNinstalled = y ]
then
    ## create org, make it the default for this repo
    echo
    
    sfdx force:org:create -s -v prehub -f ../config/project-scratch-def.json -a $org

    ## push source
    echo
    
    sfdx force:source:push -u $org

    ## assign permset
    echo

    sfdx force:user:permset:assign -n TrialAdmin -u $org

    ## delete existing data
    echo
    
    sfdx force:apex:execute -f apexDeletions.cls -u $org

    ## load data
    echo

    sfdx force:data:tree:import -p ../data/masterImportPlan.json -u $org

    ## open the org
    echo
    
    sfdx force:org:open -u $org
fi








 