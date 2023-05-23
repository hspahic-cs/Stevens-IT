#! /bin/bash
# Name: Harris Spahic
# Pledge: "I pledge my honor I have abided by the Steven's Honor System."


readonly location=~/.junk

num_flags=0

unknown_var=""
help_flag=0
list_flag=0
purge_flag=0

num_flags=0 

usage(){
    cat << EOF
"Usage: $(basename $0) [-hlp] [list of files]
    -h: Display help.
    -l: List junked files.
    -p: Purge all files.
    [list of files] with no other arguments to junk those files."
EOF
}

abnormal_exit(){
    usage
    exit 1
}

display_files(){
    ls "$location" -lAF
    exit 0
}

remove_files(){
    rm -r "$location"
    mkdir ~/.junk
    exit 0
}

while getopts ":hlp" options; do
    ((num_flags++))
    case "${options}" in
        h) 
            help_flag=1
            ;; 
        l) 
            list_flag=1
            ;; 
        p) 
            purge_flag=1
            ;; 
        *) 
            unknown_var="'-${OPTARG}'"
            break
            ;;    
    esac
done 

num_args=$(expr $# - $num_flags)

# Check if there is a bad flag
if [[ ! -z $unknown_var ]];
    then
        echo "Error: Unknown option ${unknown_var}"
        abnormal_exit 
fi 

# Check if multi-valid flags
if [[ $num_flags -gt 1 ]] || [[ $num_args -ge 1 && $num_flags -ge 1 ]];
    then
        echo "Error: Too many options enabled."
        abnormal_exit
fi

########### END OF PARSING ############

if [[ ! -d "$location" ]];
    then
        mkdir $location
fi

# Check for help or empty
if [[ $help_flag -eq 1 ]];
    then 
        usage
        exit 0
    elif [[ $# -eq 0 ]]
        then abnormal_exit
    elif [[ $list_flag -eq 1 ]];
        then display_files 
    elif [[ $purge_flag -eq 1 ]];
        then remove_files
    else 
        for file in "$@"
        do 
            if [[ ! -e "$file" ]];
                then 
                    echo "Warning: '${file}' not found."
                else 
                    mv $file $location
            fi
        done
        exit 0
fi