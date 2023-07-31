#!/usr/bin/env perl

# So that the options included in the menu are
# current with most recent version of curl.

# Would probably need better process
# to extract the option names than this
# vodoo, but seeing as this is a feature 
# request - hey - it's a starting point.

# Output options to file, remove first line, and make page for option menu.
my $curlPath = @ARGV[0];                   # store path to curl in variable
`$curlPath/src/curl -h all > options.txt`; # output options to text file
`sed -i 1d options.txt`;                   # remove first line in options.txt
`touch _manpage-option-menu.html`;         # make page to hold option menu elements

# Store files in variable
my $_options = "options.txt"; 
my $_optionMenuHTML = "_manpage-option-menu.html"; 

# Dont' know the best way to store large text elements
# so used html file. Below works, but whatever method you
# guys think is best to make final menu element.

# Output opening html tags to _manpage-option-menu.html
`cat _manpage-option-menu-parent-tags.html > _manpage-option-menu.html`;

# Open _manpage-option-menu.html to write to.
open MAN_OPTIONS, ">>", $_optionMenuHTML or die $!;

# Open options.txt to extract option names and output to _manpage-option-menu.html
open option_text, "<:encoding(UTF-8)", $_options or die $!;  

# Extract only the option text.
# Loop through option.txt and make "<li><a href="#">..</a></li>
while (my $row = <option_text>) {
  chomp $row;
  $row =~ s/^[[:space:]]*([^[:space:]]*-)/\1/;                   # remove starting space
  $row =~ s/^((-.*, --[^[:space:]]+)|(^--[^[:space:]]+)).*/\1/g; # remove text after option
  print MAN_OPTIONS "<li><a href=\"#\">$row</a></li>\n";         # append to _manpage-option-menu.html
}

# Close files, add closing tags, and remove files no longer needed.
close TEMP; close option_text;

# Output closing tags with _manpage-option-menu.html.
`cat _manpage-option-menu-close-tags.html >> _manpage-option-menu.html`;

# Remove option file longer needed.
`rm options.txt`;
