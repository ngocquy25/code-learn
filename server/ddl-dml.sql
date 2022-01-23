-- DROP DATABASE IF EXISTS code-learn-db;
-- CREATE DATABASE code-learn-db;

CREATE TABLE problem (
	question_id integer primary key,
	description varchar(1000),
	testcase_input_1 varchar(10), 
	testcase_output_1 varchar(1000),
	testcase_input_2 varchar(10),
	testcase_output_2 varchar(1000)
);

INSERT INTO problem
VALUES (31, 'Viết chương trình lấy số nguyên n từ người dùng và hiển thị tổng các số từ 1 đến n trên màn hình. 

Ví dụ, nếu n = 5, chương trình sẽ cho kết quả như sau: 1 + 2 + 3 + 4 + 5 = 15',
		
		'5', '15', '7', '28');
		
INSERT INTO problem
VALUES (32, 'Viết chương trình nhận hai số nguyên a và b từ người dùng và hiển thị tổng các số lẻ giữa a và b trên màn hình (b > a).

Ví dụ, nếu a = 3, b = 9, đầu ra phải là: 3 + 5 + 7 + 9 = 24',

		'3,9', '24', '16,24', '80');
		
INSERT INTO problem
VALUES (33, 'Viết chương trình lấy một chuỗi s từ bàn phím và hiển thị các ký tự không phải là "y" trong chuỗi s trên màn hình.

Ví dụ: nếu s = "mysql", kết quả đầu ra phải là:
		
Current character: m
Current character: s
Current character: q
Current character: l',

		'sunny', 
'Current character: s
Current character: u
Current character: n
Current character: n',
		
		'lyly', 
'Current character: l
Current character: l');

INSERT INTO problem
VALUES (34, 'Viết chương trình lấy một số nguyên a từ bàn phím và hiển thị các tích của a và các số từ 1 đến 5 trên màn hình.

Ví dụ: nếu a = 10, chương trình sẽ cho kết quả như sau:
		
10 * 1 = 10
10 * 2 = 20
10 * 3 = 30
10 * 4 = 40
10 * 5 = 50',
		
		'5', 
'5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
5 * 4 = 20
5 * 5 = 25', 
		
		'6', 
'6 * 1 = 6
6 * 2 = 12
6 * 3 = 18
6 * 4 = 24
6 * 5 = 30');
		
INSERT INTO problem
VALUES (35, 'Viết chương trình lấy hai số nguyên a và b từ người dùng và hiển thị thông tin sau trên màn hình:

Number of even numbers: {P1}
Number of odd numbers: {P2}
		
Trong đó {P1} là số các số chẵn và {P2} là số các số lẻ trong phạm vi [a, b].

Ví dụ, nếu a = 1, b = 10, chương trình sẽ cho kết quả như sau:
		
Number of even numbers: 5
Number of odd numbers: 5',
		
		'14,23', 
'Number of even numbers: 5
Number of odd numbers: 5', 
		
		'30,40', 
'Number of even numbers: 6
Number of odd numbers: 5');