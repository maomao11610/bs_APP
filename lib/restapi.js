// //用户数据示例
let users = [
    {
        "uuid": "08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a",
        "name": "毛毛",
        "password": "123",
        "avatar": '/static/images/p1.webp'
    },
    {
        "uuid": "3bb179af-bcc5-4fe0-9dac-c05688484649",
        "name": "何方",
        "password": "123",
        "avatar": '/static/images/p2.webp'
    },
    {
        "uuid": "fdee46b0-4b01-4590-bdba-6586d7617f95",
        "name": "宝马专卖西安店",
        "password": "123",
        "avatar": '/static/images/p3.webp'
    },
    {
        "uuid": "33c3693b-dbb0-4bc9-99c6-fa77b9eb763f",
        "name": "二手福建奔驰",
        "password": "123",
        "avatar": '/static/images/p4.webp'
    },
	{
	    "uuid": "33c3693b-dbb0-4bc9-99c6-fa77b9acdeb2",
	    "name": "大毛爱买车",
	    "password": "123",
	    "avatar": '/static/images/p5.webp'
	}
];
//群数据示例
let groups = [
    {
        "uuid": "group-a42b-47b2-bb1e-15e0f5f9a19a",
        "name": "宝马车友会",
        "avatar" : '/static/images/q1.webp',
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649', 'fdee46b0-4b01-4590-bdba-6586d7617f95', '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f']
    },
    {
        "uuid": "group-4b01-4590-bdba-6586d7617f95",
        "name": "二手车转让群",
        "avatar" : '/static/images/12.webp',
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', 'fdee46b0-4b01-4590-bdba-6586d7617f95', '33c3693b-dbb0-4bc9-99c6-fa77b9eb763f']
    },
    {
        "uuid": "group-dbb0-4bc9-99c6-fa77b9eb763f",
        "name": "越野交流群",
        "avatar" : '/static/images/q3.webp',
        "userList": ['08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a', '3bb179af-bcc5-4fe0-9dac-c05688484649','33c3693b-dbb0-4bc9-99c6-fa77b9acdeb2']
    }
];


function RestApi() {

}

function User(uuid, name, avatar) {
    this.uuid = uuid;
    this.name = name;
    this.avatar = avatar;
}

function Group(uuid, name, avatar) {
    this.uuid = uuid;
    this.name = name;
    this.avatar = avatar;
}

RestApi.prototype.findFriends = function (user) {
    let friendList = users.filter(v => v.uuid !== user.uuid);
    return friendList;
}

RestApi.prototype.findGroups = function (user) {
    let groupList = groups.filter(v => v.userList.find(id => id === user.uuid));
    return groupList;
}

RestApi.prototype.findUser = function (username, password) {
    let user = users.find(user => (user.name === username && user.password === password));
    if(user) {
        return new User(user.uuid, user.name, user.avatar);
    }
    return user;
}

RestApi.prototype.findGroupById = function (groupId) {
    let group = groups.find(group => (group.uuid === groupId));
    return new Group(group.uuid, group.name, group.avatar);
};

RestApi.prototype.findUserById = function (userId) {
    let user = users.find(user => (user.uuid === userId));
    return new User(user.uuid, user.name, user.avatar);
};

RestApi.prototype.findGroupMembers = function (groupId) {
    let members = {};
    let group = groups.find(v => v.uuid === groupId);
    users.map(user => {
        let groupUserUuid = group.userList.find((uuid)=>{
            return uuid === user.uuid;
        });
        if (groupUserUuid) {
            members[groupUserUuid] = new User(user.uuid, user.name, user.avatar);
        }
    });
    return members;
}

export default new RestApi();
