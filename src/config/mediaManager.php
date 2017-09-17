<?php

return [
    /*
     * ignore files pattern
     *
     * ignore any file starts with "."
     */
    'ignore_files' => '/^\..*/',

    /*
     * filesystem disk
     */
    'storage_disk' => 'public',

    /*
     * remove any file special chars except (. _ -)
     */
    'allowed_fileNames_chars' => '.\_\-',

    /*
     * remove any folder special chars except (_ -)
     *
     * to add & nest folders in one go use '\/\_\-'
     */
    'allowed_folderNames_chars' => '\_\-',

    /*
     * disallow uploading files with the following mimetypes
     * https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
     */
    'unallowed_mimes' => ['php', 'java'],

    /*
     * when file names gets cleand up
     */
    'sanitized_text' => 'sanitized',

    /*
     * css farmework
     * ex.
     * MIX_MM_FRAMEWORK=bulma
     */
    'framework' => env('MIX_MM_FRAMEWORK'),

    /*
     * display file last modification time as
     *
     * check "/vendor/nesbot/carbon/src/Carbon/Carbon.php"
     */
    'last_modified_format' => 'toDateString',
];
