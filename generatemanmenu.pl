#!/usr/bin/env perl

# So that the options included in the menu are
# current with most recent version of curl.

# Would probably need better process
# to extract the option names than this
# vodoo, but seeing as this is a feature 
# request - hey - it's a starting point.

# Or however the curl source code is called when building.

`/usr/local/lib/curl/src/curl -h all > options.txt`;
`sed -i 1d options.txt`; # Remove first line.

my $_options = "options.txt"; # store name in variable
my $_tempFile = "tmpoptions.txt";

open TEMP, ">", $_tempFile or die $!; close TEMP;
open TEMP, ">>", $_tempFile or die $!;

open (my $fh, "<:encoding(UTF-8)", $_options)
  or die "Error opening file '$options' $!";

# Extract only the option text.
# Loop through option.txt and make "<li><a href="#">..</a></li>
while (my $row = <$fh>) {
  chomp $row;
  $row =~ s/^[[:space:]]*([^[:space:]]*-)/\1/; # Remove starting space.
  $row =~ s/^((-.*, --[^[:space:]]+)|(^--[^[:space:]]+)).*/\1/g; # Remove text after option.
  print TEMP "<li><a href=\"#\">$row</a></li>\n";
}

# Above is best I'm going to do. Probably best
# if you guys replace with your magic.

close TEMP; close FILE;

# Dont' know the best way to store large text elements
# so used html file. Below works, but whatever method you
# guys think is best to make final menu element.

# Opening html to manpage-option-menu.html
`cat _manpage-option-menu-parent-tags.html > _manpage-option-menu.html`;
# Output options generated with above loop.
`cat tmpoptions.txt >> _manpage-option-menu.html`;
# Close _manpage-option-menu.html with closing text element
`cat _manpage-option-menu-close-tags.html >> _manpage-option-menu.html`;
# Clean out files no longer needed.
`rm options.txt tmpoptions.txt _manpage-option-menu-parent-tags.html _manpage-option-menu-close-tags.html`;
