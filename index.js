// *** 0 ***
// Để tạo mới 1 ứng dụng nodejs, tạo thư mục chứa project, sau đó vào trong thư mục, mở terminal (cmd), gõ npm init, nhấn enter hoặc chỉnh sửa thuộc tính theo ý muốn.
// Sau đó, tạo file index.js, tiếp theo, cài các thư viện cần thiết bằng cách gõ vào terminal các lệnh sau:
// npm install -save express
// npm install -g nodemon
// npm install --save pug
// *** 1 ***
// Sử dụng thư viện expressJS
var express = require('express');
var bodyParser = require('body-parser'); // Thư viện dùng cho form 
var multer = require('multer'); // Thư viện dùng cho form 
var session = require('express-session');
var upload = multer(); // Thư viện dùng cho form 
var app = express();


var cookieParser = require('cookie-parser'); // Thư viện dùng cho cookie
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!",resave: true, saveUninitialized: true}));
// *** 1 ***
// Note:
// Có 2 phương thức chính sử dụng cho web server là GET và POST.
// Khi GET, người dùng sẽ nhận được dữ liệu mà web trả về theo đường dẫn đã quy định. 
// Khi POST, người dùng gửi thông số lên web server để server xử lí và đưa ra kết quả. 
// Để tạo 1 đường dẫn cho người dùng có thể truy cập, dùng lệnh app.get('tên đường dẫn', ...)


// *** 6 ***
// Đây là dòng lệnh để chọn view engine cho web là pug engine
// pug engine là 1 template để render html cho ExpressJS
app.set('view engine', 'ejs');
// Chọn đường dẫn cho thư mục chứa template, ở đây thư mục được chọn là views, tạo thư mục views để chứa các file pug template, chi tiết cách viết pug tham khảo tại pugjs.org
app.set('views','./views');
app.use( express.static( "public" ) );
// *** 2 ***
// Đây là trang hiển thị mặc định khi vào web
app.get('/', function(req, res) {
    // Đây là lệnh xuất ra màn hình web của người dùng, tương tự như cout hay document.write
    res.cookie('name', 'express').render('home'); //Sets name = express
    // res.redirect('/home');
    // res.render('home');
    
});
// Xóa cookie 
app.get('/clear_cookie_name', function(req, res){
    // Xóa cookie có ID là name
    res.clearCookie('name');
    res.send('cookie name cleared');
 });

// regex
// *** 3 ***
// Đây là trang hiển thị khi vào web theo đường dẫn /home
app.all('/home', function(req, res) {
    res.render('home');
});

app.all('/contact', function(req, res) {
    res.render('contact');
});

app.all('/about', function(req, res) {
    res.render('about');
});

// *** 7 ***
// Đây là trang pug, có giao diện render bằng pug
app.get('/pug', function(req, res) {
    // đây là lệnh render file pug, ở đây file được render là file home trong thư mục views
    res.render('demo');
});
// Xu li form
app.get('/form', function(req, res) {
    res.render('form');
});
// for parsing application/json
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(upload.array());
// Xu li form, khi nguoi dung nhap dung username va password hoac nhap sai
app.post('/form', function(req, res){
    console.log(req.body);
    if (req.body.user == 'tivivui' && req.body.pass == '123456')
    res.render('home');
    else res.render('form');
 });

// *** 4 ***
// Đây là trang mặc định nếu người dùng nhập URL sai


 app.get('/s', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });

 var movies = require('./movies.js');

 //Use the Router on the sub route /movies
 app.use('/movies', movies);

 app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });

// *** 5 ***
// Đây là 2 thư viện để lấy data từ body và cookie


//  //To parse URL encoded data
//  app.use(bodyParser.urlencoded({ extended: false }))
 
//  //To parse json data
//  app.use(bodyParser.json())
//  var cookieParser = require('cookie-parser');
//  app.use(cookieParser())

// *** 1 ***
// Server này chạy ở port 3000, để truy cập, gõ localhost:3000
app.listen(process.env.PORT || 3000);

// Xem thêm tai https://www.tutorialspoint.com/expressjs/index.htm