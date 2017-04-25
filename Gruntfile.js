module.exports = function (grunt)
{
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {expand: true, cwd: "node_modules/", src: ["mirrorjs/**", "mirrorjs-widgets/**"], dest: "build/"},
                    {expand: true, cwd: "src/", src: ["index.html"], dest: "build/"}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", ["copy"]);
    grunt.registerTask("build", ["copy"]);
};
