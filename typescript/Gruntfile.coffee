module.exports = (grunt) =>
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        typescript:
            background:
                src: [
                    'src/common/**/*.ts'
                    'src/background/**/*.ts'
                ]
                dest: 'build/background.js'
    grunt.loadNpmTasks 'grunt-typescript'
    grunt.registerTask 'build', 'ビルドでござる',['typescript:background']
