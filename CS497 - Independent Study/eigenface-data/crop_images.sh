#!/bin/bash
for file in *
do
  if [[ -d "$file" ]]
  then
    autocrop -i "$file" -o "$file-cropped" -r "$file-reject" -w 60 -H 100 --facePercent 80
  fi
done
