
website_build:	## build website
	@npm --prefix website run build
website_serve:	## build website
	@npm --prefix website run dev

website_deploy:   ## deploy admin
	@firebase deploy --only hosting:website

admin_build:	## build website
	@npm --prefix admin run build
admin_serve:	## build website
	@npm --prefix admin run dev

admin_deploy:   ## deploy admin
	@firebase deploy --only hosting:admin


help:           ## How to use this makefile
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/:\(.*\)##\(.*\)/:\2/'

