import gulp from 'gulp'
import sass from 'gulp-sass'
import browserSync from 'browser-sync'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import cleancss from 'gulp-clean-css'
import rename from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer'
import bourbon from 'node-bourbon'
import notify from 'gulp-notify'
import injectPartials from 'gulp-inject-partials'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import pump from 'pump'
import babel from 'gulp-babel'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

const compileStyle = () => {
    return (
        gulp
            .src('sass/**/*.s*')
            .pipe(sourcemaps.init())
            .pipe(
                sass({
                    includePaths: bourbon.includePaths
                }).on('error', notify.onError())
            )
            .pipe(rename({ suffix: '.min', prefix: '' }))
            .pipe(autoprefixer(['last 15 versions']))
            // .pipe(cleancss())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('css'))
            .pipe(browserSync.reload({ stream: true }))
    )
}

const compileScript = cb => {
    pump(
        [
            gulp.src([
                // 'node_modules/jquery/dist/jquery.min.js',
                //'javascript/libs/popper/popper.min.js',
                //'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'javascript/main.js'
            ]),
            concat('scripts.min.js'),
            plumber(),
            babel({
                presets: ['@babel/env']
            }),
            uglify(),
            gulp.dest('javascript'),
            browserSync.reload({ stream: true })
        ],
        cb
    )
}

const compileScriptWebpack = cb => {
    pump(
        [
            gulp.src(['javascript/app.js']),
            webpackStream({
                output: {
                    filename: 'app.js'
                },
                module: {
                    rules: [
                        {
                            test: /\.(js)$/,
                            exclude: /(node_modules)/,
                            loader: 'babel-loader',
                            query: {
                                presets: ['@babel/env']
                            }
                        }
                    ]
                },
                externals: {
                    jquery: 'jQuery'
                }
            }),
            // rename({ suffix: '.min' }),
            rename('scripts.min.js'),
            gulp.dest('javascript'),
            browserSync.reload({ stream: true })
        ],
        cb
    )
}

const compileMarkup = done => {
    browserSync.reload(), done()
}

const buildTask = done => {
    gulp.src(['Html/*.html']).pipe(gulp.dest('../../Resources/Public/html'))
    gulp.src(['index.html']).pipe(gulp.dest('../../Resources/Public'))
    gulp.src(['css/*.css']).pipe(gulp.dest('../../Resources/Public/css'))
    gulp.src(['fonts/**/*']).pipe(gulp.dest('../../Resources/Public/fonts'))
    gulp.src(['javascript/scripts.min.js']).pipe(gulp.dest('../../Resources/Public/javascript'))
    gulp.src(['javascript/libs/**/*']).pipe(gulp.dest('../../Resources/Public/javascript/libs'))
    gulp.src(['images/**/*']).pipe(gulp.dest('../../Resources/Public/images'))
    gulp.src(['Icons/**/*']).pipe(gulp.dest('../../Resources/Public/icons'))
    done()
}

const watchStyle = () => {
    gulp.watch('sass/**/*.s*', compileStyle)
}

const watchScript = () => {
    gulp.watch(['libs/**/*.js', 'javascript/main.js', 'javascript/app.js', 'javascript/components/*.js'], compileScriptWebpack)
}

const watchMarkup = () => {
    gulp.watch('html/*.html', compileMarkup)
}

const compile = gulp.parallel(compileStyle, compileScriptWebpack)

const startServer = () => {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        // open: true,
        tunnel: false
        //tunnel: '' //Demonstration page: http://duebs.localtunnel.me
    })
}

const build = gulp.series(compile, buildTask)

const serve = gulp.series(compile, startServer)

const watch = gulp.parallel(watchStyle, watchScript, watchMarkup)

const defaultTasks = gulp.parallel(serve, watch)

exports.build = build

exports.default = defaultTasks
