// 包装函数
module.exports = function(grunt) {

	// 任务配置,所有插件的配置信息
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// //编译sass文件
		// sass: {
		// 	dist : {
		// 		options: {
		// 			style: 'expanded'
		// 		},
		// 		files: {
		// 			'./src/css/style.css' : './src/css/style.scss'
		// 		}
		// 	}
		// },


		//压缩CSS文件
		cssmin: {
			target: {
				files: [{
					expand: true, //启用下列参数
					cwd: './src/css', //指定带压缩文件路径
					src: ['*.css', '!*.min.css'], //匹配相对于cwd目录下的非 .min.css的所以.css文件
					dest: './dep/css', //生成的压缩文件存放地址
					ext: '.min.css' //生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
				}]
			}
		},
		//合并文件
		concat: {
			options: {
				separator: '',
			},
			dist: {
				src: ['./src/js/H5.js', './src/js/H5_loading.js', './src/js/H5ComponentBar.js', './src/js/H5ComponentBar_v.js', './src/js/H5ComponentBase.js', './src/js/H5ComponentPie.js', './src/js/H5ComponentPoint.js', './src/js/H5ComponentPolyline.js', './src/js/H5ComponentRadar.js', './src/js/H5ComponentRing.js'], //需要合并的文件
				dest: './src/js/global.js' //合并后文件地址
			},
		},


		//检查JS是否语法正确
		jshint: {
			all: ['./src/js/H5.js', './src/js/H5_loading.js', './src/js/H5ComponentBar.js', './src/js/H5ComponentBar_v.js', './src/js/H5ComponentBase.js', './src/js/H5ComponentPie.js', './src/js/H5ComponentPoint.js', './src/js/H5ComponentPolyline.js', './src/js/H5ComponentRadar.js', './src/js/H5ComponentRing.js']
		},

		// uglify插件的配置信息, 用于压缩js
		uglify: {
			options: {
				banner: '/*! This is 组件化开发web app  - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */',
				beautify: true, //是否压缩
				mangle: true, //混淆变量名
				compress: true, //打开或关闭使用默认选项源压缩。
			},
			//build/app.min.js 为生成js保存名字与位置, 数组为需要压缩的js文件
			app_task: {
				files: {
					'./dep/js/global.min.js': ['./src/js/global.js'],
				}
			}
		},


		//监控文件变化并自动运行grunt的watch插件
		//watch插件的配置信息
		watch: {
			scripts: {
				files: ['./src/js/H5.js', './src/js/H5_loading.js', './src/js/H5ComponentBar.js', './src/js/H5ComponentBar_v.js', './src/js/H5ComponentBase.js', './src/js/H5ComponentPie.js', './src/js/H5ComponentPoint.js', './src/js/H5ComponentPolyline.js', './src/js/H5ComponentRadar.js', './src/js/H5ComponentRing.js'],
				options: {
					livereload: true
				},
				tasks: ['jshint', 'uglify']
			},
			// sass: {
			// 	files: ['./src/css/style.scss'],
			// 	tasks: ['sass'],
			// 	options: {
			// 		livereload: true
			// 	}
			// },
			html: {
				files: ['./*.html'],
				options: {
					livereload: true
				}
			}
			// livereload: {
			// 	options: {
			// 		livereload: '<%= connect.options.livereload %>'
			// 	},
			// 	files: [
			// 		'index.html',
			// 		'./dep/css/style.css',
			// 		'./dep/js/global.min.js'
			// 	]
			// }
		},
		//搭建本地服务器 端口号8000
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			server: {
				options: {
					port: 9001,
					base: './'
				}
			}
		}
	});

	// 告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 告诉grunt当我们在终端中输入grunt时需要做些什么
	grunt.registerTask('outputcss', ['cssmin']); //编译sass 压缩css
	grunt.registerTask('concatjs', ['concat']); //合并JS文件
	grunt.registerTask('compressjs', ['concat', 'uglify']); //合并JS 检查 压缩
	grunt.registerTask('watchit', ['cssmin', 'concat', 'jshint', 'uglify', 'connect', 'watch']);
	grunt.registerTask('default', ['cssmin', 'uglify', 'connect', 'watch']);
};