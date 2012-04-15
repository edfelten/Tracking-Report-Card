package : clean 
	cd TRC@extension && zip -r ../Tracking_Report_Card.xpi * && cd ..

clean :
	rm -f Tracking_Report_Card.xpi
