// *** 0 ***
// Để tạo mới 1 ứng dụng nodejs, tạo thư mục chứa project, sau đó vào trong thư mục, mở terminal (cmd), gõ npm init, nhấn enter hoặc chỉnh sửa thuộc tính theo ý muốn.
// Sau đó, tạo file index.js, tiếp theo, cài các thư viện cần thiết bằng cách gõ vào terminal các lệnh sau:
// npm install -save express
// npm install -g nodemon
// npm install --save pug
// *** 1 ***
// Sử dụng thư viện expressJS
var express = require('express');
var app = express();
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
    res.redirect('/home');
});

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

// *** 4 ***
// Đây là trang mặc định nếu người dùng nhập URL sai
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });


// *** 5 ***
// Đây là 2 thư viện để lấy data từ body và cookie
//  var bodyParser = require('body-parser');

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