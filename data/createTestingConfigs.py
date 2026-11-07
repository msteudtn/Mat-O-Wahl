#
# This script is just to create the demo-files (index_*.html and config_*.js) in two flavors: with BASIC (default) settings and with ALL settings.
# You can delete or ignore it. :)
#
# @license
# Mat-o-Wahl
# v0.7.x 
# https://github.com/msteudtn/Mat-O-Wahl
# License: GPL 3+
#

############################################################################

# List of languages to create 
list_languages = ["de", "en"]

# List of filenames to create.
list_configfile =  ["config_basic", "config_all" ] 	# will be turned into "config_basic_de.js" and "config_all_de.js"
list_indexfile  = ["index_basic", "index_all" ]		# will be turned into "index_basic_de.html" and "index_all_de.html"

# Dictionary of variables that are basically the same per language
dictionary_variables_language = {
	"delimiter": [ "';'", "';'" ],
	"descriptionShowOnStart" : [1, 1],
	"my_o_mat": [ "'Frucht-o-Mat'", "'Fruit-o-Mat'" ],
	"descriptionHeading1": [ "'Fruchtkorbwahlen'", "'Fruitville Elections'" ],
	"descriptionHeading2": [ "'Die Wahl zur neuen Regierung in Obsthausen'", "'Elections for the new city council in Fruitville'"],
 	"descriptionExplanation": [ "'Am 30. Februar finden in Obsthausen Wahlen statt. Sie k&ouml;nnen sich hier alle Parteipositionen anschauen und miteinander vergleichen. Dies ist <strong>keine Wahlempfehlung</strong>, sondern ein Informationsangebot zu Wahlen! <br /> Zur Auswahl stehen vier Parteien mit unterschiedlichen Meinungen zu kontroversen Themen der Obst- und Frucht-Landschaft.'" , "'On February 30 elections will be held in Fruitville. You can check and compare all opinions of your favorite candidates here. This is no endorsement but just an information on the upcoming election!'"],
	"fileQuestions": ["'data/Obsthausen-08-Fragen.csv'", "'data/Fruitville-08-questions.csv'"], 
	"intQuestions" : [ 8, 8],
	"strQuestions_moreInformation_symbol" : ["'&#9432;'", "'&#9432;'"],
	"intShowButtonNeutral" : [1, 1],
	"intShowButtonDouble" :  [1, 1],
	"intShowButtonSkip" :   [1, 1],
	"fileCandidates" : [ "'data/Obsthausen-09-Kandidaten-08-Antworten.csv'", "'data/Fruitville-09-candidates-08-answers.csv'" ],
	"language" : ["'de'", "'en'"],
	"design" : [ "['styles/default.css','styles/bootstrap-override.css']", "['styles/default.css','styles/bootstrap-override.css']" ],
	"imprintLink" : [ "'system/imprint.html'", "'system/imprint.html'"],
	"imprintPrivacyUrl" : ["'datenschutz.html'", "'privacy.html'"],
}


# Dictionary of variables that are different based on default ("basic") or "all options active".
dictionary_variables_basic_all = {
	"intQuestions_categories_rowInCSV" : [0, 3],
	"intQuestions_moreInformation_rowInCSV" : [0, 4],
	"intQuestionButtons" : [2, 4],
	"intLimitResults" : [ 0, 3 ],
	"intShowResultsFilter" : [0, 1],
	"addons" : [ "[]", "[]"],
	"statsRecord" : [ 0, 1 ],
	"statsServer" : ["''", "'save_to_db.php'"]
	}



# Go through the list of languages (de, en)
for i in range(len(list_languages)):

	print ("\n Going through language number ",i," : ",list_languages[i])

	# for each language, copy the original file into the new filename
	for j in range(len(list_configfile)):

		# Create a CONFIG filename 
		filename_config = list_configfile[j]+"_"+list_languages[i]+".js"
		print ("  Setting filename",filename_config )

		newfile_content = ""

		# Go through the new file(s) and set the language-specific variables
		for variable_language in dictionary_variables_language:

			newfile_content += 'let '+variable_language+' = '+str(dictionary_variables_language[variable_language][i])+'; \n'

		# Go through the new file(s) and set the basic/all-specific variables
		for variable_basic_all in dictionary_variables_basic_all:

			newfile_content += 'let '+variable_basic_all+' = '+str(dictionary_variables_basic_all[variable_basic_all][j])+ '; \n'

		# Write everything into the new CONFIG file
		print ("  Writing data into file: ", filename_config)
		filehandle_config_new = open(filename_config, "w")
		filehandle_config_new.write(newfile_content)
		filehandle_config_new.close()


		# Create an INDEX filename 
		filename_index  = list_indexfile[j]+"_"+list_languages[i]+".html"
		print ("  Setting filename",filename_index )

		newfile_content = ""

		indexHTML_original_filehandle = open("../index.html")

		# Loop through the new file and replace the "config.js" with the new link, like "config_all_en.js"
		with indexHTML_original_filehandle as indexHTML_file:

			for indexHTML_line in indexHTML_file:

				position = indexHTML_line.find("data/config.js")

				if (position >= 0):
					newfile_content += '	<script type="text/javascript" src="data/'+filename_config+'"></script> \n'
				else:
					newfile_content += indexHTML_line

		indexHTML_original_filehandle.close()

		# Write everything into the new INDEX file
		print ("  Writing data into file: ", filename_index)
		filehandle_index_new = open("../"+filename_index, "w")
		filehandle_index_new.write(newfile_content)
		filehandle_index_new.close()


print("\033[91m \nWarning! The next step will delete the newly created files again. \n(All other files stay untouched) \nThis is meant to clean the demo-files from the folders before \nshipping to production. :)\n \033[0m")

from sys import exit

try:
    input('\033[91m Press "Ctrl+C" to cancel or "Enter" to delete the new files. \033[0m \n')

except KeyboardInterrupt:
    # User interrupt the program with Ctrl+C
    exit()


import os

# Create filenames again and delete file
for i in range(len(list_languages)):

	# for each language, copy the original file into the new filename
	for j in range(len(list_configfile)):

		# Create a filenames
		filename_config = list_configfile[j]+"_"+list_languages[i]+".js"
		filename_index  = list_indexfile[j]+"_"+list_languages[i]+".html"

		print ("Deleting test- and demo-file:",filename_config)
		os.remove(filename_config) 
		print ("Deleting test- and demo-file:",filename_index)
		os.remove("../"+filename_index) 

