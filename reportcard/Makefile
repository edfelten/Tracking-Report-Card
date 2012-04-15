
default: output3p.json output1p.json

output3p.json output1p.json gradingPolicy.json: makeReportCard.py gradingPolicy.py input3p.json input1p.json companyNames.json
	python makeReportCard.py 

companyNames.json: companyNames.py ../combinedBeefTacoFiles.json
	python companyNames.py >companyNames.json

input3p.json: processCountPerdomain.py input_3p_count_perdomain.json companyNames.json
	python processCountPerdomain.py >input3p.json

input1p.json: ../sample_domain_pairs.json
	cp ../sample_domain_pairs.json input1p.json

clean:
	rm -f output1p.json output3p.json gradingPolicy.json companyNames.json input3p.json input1p.json

