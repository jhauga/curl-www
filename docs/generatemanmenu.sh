#!/bin/bash

# So that the options included in the menu are
# current with most recent version of curl.

# Would probably need better process
# to extract the option names than this
# vodoo, but seeing as this is a feature 
# request - hey - it's a starting point.

# Or however the curl source code is called when building.
curl -h all > options.txt

# begin vodoo
sed -i -E 's/ (-.*)/\1/g' options.txt
sed -i -E 's/    (--.*)/\1/g' options.txt
sed -i -E 's/(-.*, --.* ) (.)*/\1/g' options.txt
sed -i -E 's/(--.* ) (\<.*)*/\1/g' options.txt
sed -i -E 's/(--.* )*(<)(.*)/\1/g' options.txt
sed -i -E 's/(--.*) *<.*/\1/g' options.txt
sed -i -E 's/(.*)  /\1/g' options.txt
sed -i -E 's/(--.*)(.*[[:space:]])/\1/' options.txt
sed -i -E 's/(--.*)([[:space:]].[[:space:]] .)/\1/' options.txt
sed -i -E 's/  //g' options.txt
sed -i -E 's/(--.*) (.*\w .*\w) */\1/' options.txt
sed -i "s/Usage: curl \[options...\]//" options.txt
sed -i -E 's/(--.*) .*\w* .* */\1/' options.txt
sed -i -E 's/(--.*) \w*/\1/' options.txt
sed -i -E 's/(--.*) \w*/\1/' options.txt
sed -i -E 's/(--.*) \w*/\1/' options.txt
sed -i -E "s|([a-z])/[a-zA-Z]*|\1|" options.txt
sed -i ':a;N;$!ba;s/ \n//' options.txt
# end vodoo

# Above is best I'm going to do. Probably best
# if you guys replace with your magic.

# Dont' know the best way to store large text elements
# so used html file. Below works, but whatever method you
# guys think is best to make final menu element.

cat _manpage-option-menu-parent-tags.html > _manpage-option-menu.html

# Loop through option.txt and make "<li><a href="#">..</a></li>
while read -r line; do
	echo \ \ \ \ \ \ \ \ \<li\>\<a href=\"#\"\>$line\</a\>\</li\>
done < options.txt >> _manpage-option-menu.html

# Close _manpage-option-menu.html with closing text element
cat _manpage-option-menu-close-tags.html >> _manpage-option-menu.html

# Clean out files no longer needed.
rm options.txt _manpage-option-menu-parent-tags.html _manpage-option-menu-close-tags.html
