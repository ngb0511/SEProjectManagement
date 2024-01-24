Create database SEProjectManagement;

/*------------------------------------------------Create tables-------------------------------------------------*/

/*Account*/

Create table Account
(
	accountID int  identity(1,1) primary key,
	email nvarchar (150),
    pwd nvarchar(150),
    accountTypeID int
);

/*AccountType: for permissions*/

Create table AccountType
(
	accountTypeID int identity(1,1) primary key,
    accountTypeName nvarchar(150),
    permission nvarchar(150)
);

/*Student: store students' information, each student has 1 account*/

Create table Student
(
	studentID int primary key,
    sName nvarchar(150),
    gender nvarchar(4),
    birth datetime,
    homeTown nvarchar(150),
    address nvarchar(150),
    email nvarchar(150),
    phoneNumber int,
    termID int,
    accountID int
);

/*Term: student's term*/

Create table Term
(
	termID int identity(1,1) primary key,
    term int,
    Note nvarchar(150)
);

/*Instructor: store instructors' information, each instructor has 1 account*/

Create table Instructor
(
	instructorID int identity(1,1) primary key,
    iName nvarchar(150),
    gender nvarchar(4),
    birth datetime,
    homeTown nvarchar(150),
    address nvarchar(150),
    email nvarchar(150),
    phoneNumber int,
	degree nvarchar(150),
    accountID int
);

/*Topic: topics' information given by instructors and registered by students*/

Create table Topic
(
	topicID int identity(1,1) primary key,
    topicName nvarchar(150),
    request nvarchar(150),
    description nvarchar(150),
	instructorID int,
	subjectID int
);

/*Tag: Keyword for topic/project searching*/

Create table Tag
(
	tagID int identity(1,1) primary key,
    tagName nvarchar(150),
    description nvarchar(150)
);

/*TopicDetail: Tags of 1 topic*/

Create table TopicDetail
(
	detailID int identity(1,1) primary key,
    tagID int,
    topicID int,
	note nvarchar(150)
);

/*TopicRegister: topic list registered by students, maximum 2 students each topic*/

Create table TopicRegister
(
	registerID int identity(1,1) primary key,
	topicID int,
    student1ID int,
    student2ID int,
    status nvarchar(150)
);

/*Project: after registered topic is accepted, student will follow requests given in topics table and start implementing project*/

Create table Project  
(
	projectID int identity(1,1) primary key,
    projectName nvarchar(150),
    request nvarchar(150),
    description nvarchar(150),
    point decimal,
    semester int,
    year int,
    student1ID int,
    student2ID int,
	instructorID int,
	subjectID int,
    status nvarchar(150)
);

/*ProjectDetail: Tags of 1 project*/

Create table ProjectDetail
(
	detailID int identity(1,1) primary key,
	projectID int ,
    tagID int ,
	note nvarchar(150),
);

/*ProjectResources: store source link of project*/

Create table ProjectResources
(
	resourcesID int identity(1,1) primary key,
    projectID int,
    resourcesName nvarchar(150),
    filePath VARCHAR(MAX)
);

/*------------------------------------------------Update database-------------------------------------------------*/

Create table Subject
(
	subjectID int identity(1,1) primary key,
	subjectName nvarchar(200),
);

Create table ProjectProgress
(
	progressID int identity(1,1) primary key,
	projectID int,
    studentID int,
	progressName nvarchar(200),
	startDate datetime,
	endDate datetime,
	status nvarchar(200),
);

CREATE Table RegisterCalendar(
    RCID int identity(1,1) primary key,
    StartDate DateTime,
    EndDate DateTime,
    Semester int,
    RYear int
);

Create table CurrentSubject
(
	cSubjectID int identity(1,1) primary key,
    studentID int,
	subjectID int
);

/*------------------------------------------------Add foreign keys-----------------------------------------------*/

Alter table Account add constraint FK_Account_AccountType foreign key (accountTypeID) references AccountType(accountTypeID);

Alter table Student add constraint FK_Student_Account foreign key (accountID) references Account(accountID);
Alter table Student add constraint FK_Student_Term foreign key (termID) references Term(termID);

Alter table Instructor add constraint FK_Instructor_Account foreign key (accountID) references Account(accountID);

Alter table Topic add constraint FK_Topic_Instructor foreign key (instructorID) references Instructor(instructorID);
Alter table Topic add constraint FK_Topic_Subject foreign key (subjectID) references Subject(subjectID);

Alter table TopicDetail add constraint FK_TopicDetail_Tag foreign key (tagID) references Tag(tagID);
Alter table TopicDetail add constraint FK_TopicDetail_Topic foreign key (topicID) references Topic(topicID);

Alter table TopicRegister add constraint FK_TopicRegister_Topic foreign key (topicID) references Topic(topicID);
Alter table TopicRegister add constraint FK_TopicRegister_Student1 foreign key (student1ID) references Student(studentID);

Alter table Project add constraint FK_Project_Instructor foreign key (instructorID) references Instructor(instructorID);
Alter table Project add constraint FK_Project_Student1 foreign key (student1ID) references Student(studentID);
Alter table Project add constraint FK_Project_Subject foreign key (subjectID) references Subject(subjectID);

Alter table ProjectDetail add constraint FK_ProjectDetail_Project foreign key (projectID) references Project(projectID);
Alter table ProjectDetail add constraint FK_ProjectDetail_Tag foreign key (tagID) references Tag(tagID);

Alter table ProjectResources add constraint FK_ProjectResources_Project foreign key (projectID) references Project(projectID);

Alter table ProjectProgress add constraint FK_ProjectProgress_Project foreign key (projectID) references Project(projectID);
Alter table ProjectProgress add constraint FK_ProjectProgress_Student foreign key (studentID) references Student(studentID);

Alter table CurrentSubject add constraint FK_CurrentSubject_Subject foreign key (subjectID) references Subject(subjectID);
Alter table CurrentSubject add constraint FK_CurrentSubject_Student foreign key (studentID) references Student(studentID);

/*------------------------------------------------Add sample data-------------------------------------------------*/

SET DATEFORMAT DMY

Insert into AccountType(accountTypeName, permission) values (N'Admin',N'Toàn quyền');
Insert into AccountType(accountTypeName, permission) values (N'Giảng viên',N'Quản lý đề tài');
Insert into AccountType(accountTypeName, permission) values (N'Sinh viên',N'Đăng kí');

Insert into Tag(tagName, description) values ('Web',N'Ứng dụng website');
Insert into Tag(tagName, description) values ('Mobile App',N'Ứng dụng di động');
Insert into Tag(tagName, description)values ('Winform App',N'Ứng dụng window');
Insert into Tag(tagName, description) values ('Game',N'Game');
Insert into Tag(tagName, description) values ('Tech Research',N'Tìm hiểu công nghệ');

Insert into Account(email, pwd,accountTypeID) values ('admin','4dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a12a280433ed6fa46510a',1);

Insert into Account (email,pwd,accountTypeID) values ('dungta@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('trinhhhtm@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('hoannc@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('trucntt@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('yentth@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('toannt@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('anhht@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('dongnt@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('tronglt@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('tuyendtt@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);
Insert into Account (email,pwd,accountTypeID) values ('khangnttm@uit.edu.vn','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);

Insert into Account (email,pwd,accountTypeID) values ('timzed544@gmail.com','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',2);

Insert into Account (email,pwd,accountTypeID) values ('20520544','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',3);
Insert into Account (email,pwd,accountTypeID) values ('20520406','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',3);
Insert into Account (email,pwd,accountTypeID) values ('20520456','3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2',3);

Insert into Subject(subjectName) 
values (N'Đồ án 1')
Insert into Subject(subjectName) 
values (N'Đồ án 2')

Insert into Term (term,Note) values (2015,'K10');
Insert into Term (term,Note) values (2016,'K11');
Insert into Term (term,Note) values (2017,'K12');
Insert into Term (term,Note) values (2018,'K13');
Insert into Term (term,Note) values (2019,'K14');
Insert into Term (term,Note) values (2020,'K15');
Insert into Term (term,Note) values (2021,'K16');
Insert into Term (term,Note) values (2022,'K17');
Insert into Term (term,Note) values (2023,'K18');
Insert into Term (term,Note) values (2024,'K19');

Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Trần Anh Dũng',N'Nam','1/1/2023','TPHCM','xxx,TPHCM','dungta@uit.edu.vn','000000000',N'Thạc sĩ',2)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Huỳnh Hồ Thị Mộng Trinh',N'Nữ','1/1/1990','TPHCM','xxx,TPHCM','trinhhhtm@uit.edu.vn','000000000',N'Thạc sĩ',3)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Nguyễn Công Hoan',N'Nam','1/1/1990','TPHCM','xxx,TPHCM','hoannc@uit.edu.vn','000000000',N'Thạc sĩ',4)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Nguyễn Thị Thanh Trúc',N'Nữ','1/1/1990','TPHCM','xxx,TPHCM','trucntt@uit.edu.vn','000000000',N'Thạc sĩ',5)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Trần Thị Hồng Yến',N'Nữ','1/1/1990','TPHCM','xxx,TPHCM','yentth@uit.edu.vn','000000000',N'Thạc sĩ',6)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Nguyễn Tấn Toàn',N'Nam','1/1/1990','TPHCM','xxx,TPHCM','toannt@uit.edu.vn','000000000',N'Thạc sĩ',7)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Huỳnh Tuấn Anh',N'Nam','1/1/1990','TPHCM','xxx,TPHCM','anhht@uit.edu.vn','000000000',N'Thạc sĩ',8)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Nguyễn Trịnh Đông',N'Nam','1/1/1990','TPHCM','xxx,TPHCM','dongnt@uit.edu.vn','000000000',N'Thạc sĩ',9)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Lê Thanh Trọng',N'Nam','1/1/1990','TPHCM','xxx,TPHCM','tronglt@uit.edu.vn','000000000',N'Thạc sĩ',10)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Đỗ Thị Thanh Tuyền',N'Nữ','1/1/1990','TPHCM','xxx,TPHCM','tuyendtt@uit.edu.vn','000000000',N'Thạc sĩ',11)
Insert into Instructor (iName,gender,birth,homeTown,address,email,phoneNumber,degree,accountID)
values (N'Nguyễn Tấn Trần Minh Khang',N'Nam','1/1/1990','TPHCM','xxx,TPHCM','khangnttm@uit.edu.vn','000000000',N'Giáo sư',12)

Insert into Student (studentID,sName,gender,birth,homeTown,address,email,phoneNumber,termID,accountID ) 
values (20520544,N'Nguyễn Huỳnh Gia Huy',N'Nam','08/11/2002','TPHCM','xxx,TPHCM','20520544@gm.uit.edu.vn','000000000',6,14)
Insert into Student (studentID,sName,gender,birth,homeTown,address,email,phoneNumber,termID,accountID ) 
values (20520406,N'Nguyễn Gia Bảo',N'Nam','05/11/2002','TPHCM','xxx,TPHCM','20520406@gm.uit.edu.vn','000000000',6,15)
Insert into Student (studentID,sName,gender,birth,homeTown,address,email,phoneNumber,termID,accountID ) 
values (20520456,N'Đặng Đình Dũng',N'Nam','05/06/2002','TPHCM','xxx,TPHCM','20520456@gm.uit.edu.vn','000000000',6,16)

Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ví Mutil-sig trên mạng Bitcoin',N'website','',1, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu Solidity và xây dựng ứng dụng minh họa',N'website','',1, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng hệ thống quản lý đề tài Đồ án Khoa CNPM',N'website','website',5, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng học nhóm ảo',N'website','website',1, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu và xây dựng nhà sách NFT ',N'website','website',1, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N' Xây dựng ứng dụng blockchain hỗ trợ tuyển việc',N'website','website',1, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng thuê trọ',N'website','website',2, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng nuôi thú',N'website','website',2, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng đánh cờ',N'website','website',2, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng dự đoán ',N'website','website',2, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng bán hàng',N'website','website',2, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng bán giày',N'website','website',2, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu Reactjs và xây dựng ứng dụng minh họa',N'website','website', 8, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu NodeJs và xây dựng ứng dụng minh họa',N'website','website', 8, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu Expressjs và xây dựng ứng dụng minh họa',N'website','website', 8, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu VueJs và xây dựng ứng dụng minh họa',N'website','website', 8, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu Angular và xây dựng ứng dụng minh họa',N'website','website', 8, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu Unity và xây dựng ứng dụng minh họa',N'website','game', 8, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu .Net và xây dựng ứng dụng minh họa',N'website','website', 8, 1)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng học nhóm ảo',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu và xây dựng nhà sách NFT',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N' Xây dựng ứng dụng blockchain hỗ trợ tuyển việc ',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng thuê trọ',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng nuôi thú',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng đánh cờ',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng dự đoán ',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng bán hàng',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng vận chuyển',N'website','website', 8, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Tìm hiểu và xây dựng nhà sách NFT)',N'website','website', 6, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N' Xây dựng ứng dụng blockchain hỗ trợ tuyển việc',N'website','website', 7, 2)
Insert into Topic(topicName,request,description,instructorID, subjectID) 
values (N'Xây dựng ứng dụng thuê trọ',N'website','website', 4, 2)

Insert into Project(projectName,request,description,point,semester,year,student1ID,student2ID,instructorID, subjectID) 
values (N'Xây dựng ứng dụng thuê trọ',N'',N'Đồ án 1',10,1,2021,20520406,20520456,1, 1)

Insert into TopicRegister(topicID,student1ID,student2ID, status) 
values (1, 20520406, 20520456, 'approved')

Insert into ProjectProgress(projectID,studentID,progressName,startDate,endDate,status) 
values (1, 20520406, N'Dựng base code','11/09/2023','11/09/2023','Done')

Insert into ProjectDetail (projectID,tagID,note) values (1,1,'');
Insert into ProjectDetail (projectID,tagID,note) values (1,2,'');
/*Insert into ProjectDetail (projectID,tagID,note) values (2,3,'');
Insert into ProjectDetail (projectID,tagID,note) values (2,4,'');*/

Insert into CurrentSubject (studentID,subjectID) values (20520406,2);
Insert into CurrentSubject (studentID,subjectID) values (20520456,2);
Insert into CurrentSubject (studentID,subjectID) values (20520544,2);