# Platform Trial


## architectural docs

* Opens Start tab
* Start tab contain welcomeMat component (hosts OverlayLibrary)
* welcomeMat component launches TrialWelcome2.  Should startPopovers when closed
* TrialWelcome2
  * hello (next)
	* path selection cards (next)
	* story setup (placeholder)
	  * final save of Trial Activity (top level config)
		* notifyClose for the big modal (Start/welcomeMat/TrialWelcome2)

Saving that has caused the stepchange handler on CurrentTaskController to run.  Once it detects the step change, it fires startPopovers on popoverManager

popover Manager



## Laziness
sfdx force:apex:execute -f SetupScripting/trialReset.cls && sfdx force:org:open -p /one/one.app#/n/Start


## TODO
hide the meta app
hide the meta tabs (trial activities, path activities, walkthroughs)

