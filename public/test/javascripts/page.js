$(function () {
    $("#add").click(function () {
        var _id = $("#edit").find('input[name="_id"]').val();

        if (_id === '') {
            _id = null;
        }

        var story = {
            _id: _id,
            title: $("#edit").find('input[name="title"]').val(),
            cover: 'cover.png',
            publisher: 'wangrunbo',
            chapters: [
                {
                    name: '章节一',
                    image: 'chapter_1.png',
                    storyline: [
                        {
                            image: 'c1_story_1.png',
                            content: '你走进一个房间，房间中央有一台桌子，桌子上有三种水果！',
                            selection: [
                                {
                                    content: '吃掉苹果',
                                    target: 1,
                                    ending: true
                                },
                                {
                                    content: '吃掉桔子',
                                    target: 2,
                                    ending: true
                                },
                                {
                                    content: '吃掉西瓜',
                                    target: 3,
                                    ending: true
                                }
                            ]
                        }
                    ],
                    created: Date.now(),
                    deleted: null
                },
                {
                    name: '章节二',
                    image: 'chapter_2.png',
                    storyline: [
                        {
                            image: 'c2_story_1.png',
                            content: '你走进一个房间，发现一扇紧锁的门！',
                            selection: [
                                {
                                    content: '打开门',
                                    target: 2,
                                    ending: false
                                },
                                {
                                    content: '转身离开',
                                    target: 4,
                                    ending: true
                                }
                            ]
                        },
                        {
                            image: 'c2_story_2.png',
                            content: '你走进那个房间，房间中央有一台桌子，桌子上有三种水果！',
                            selection: [
                                {
                                    content: '吃掉苹果',
                                    target: 1,
                                    ending: true
                                },
                                {
                                    content: '吃掉桔子',
                                    target: 2,
                                    ending: true
                                },
                                {
                                    content: '吃掉西瓜',
                                    target: 3,
                                    ending: true
                                }
                            ]
                        }
                    ],
                    created: Date.now(),
                    deleted: null
                },
            ],
            ending: [
                {
                    name: '喜欢苹果',
                    image: 'apple.png',
                    storyline: [],
                    created: Date.now(),
                    deleted: null
                },
                {
                    name: '喜欢桔子',
                    image: 'orange.png',
                    storyline: [],
                    created: Date.now(),
                    deleted: null
                },
                {
                    name: '喜欢西瓜',
                    image: 'watermelon.png',
                    storyline: [],
                    created: Date.now(),
                    deleted: null
                },
                {
                    name: '回家',
                    image: 'home.png',
                    storyline: [
                        {
                            image: 'e4_story_1.png',
                            content: '你走出了房间，回到了路边'
                        },
                        {
                            image: 'e4_story_2.png',
                            content: '一辆出租车路过，你挥手拦下了它'
                        },
                        {
                            image: 'e4_story_3.png',
                            content: '出租车一路拉着你回到了家，你现在只想好好睡上一觉'
                        }
                    ],
                    created: Date.now(),
                    deleted: null
                }
            ],
            authors: [
                {
                    name: 'wangrunbo',
                    role: '策划'
                },
                {
                    name: 'wangce',
                    role: '美术'
                }
            ],
            anonymous: false,
            published: null,
        };

        $.ajax({
            url: '/story',
            type: 'post',
            data: JSON.stringify(story),
            contentType: 'application/json',
            dataType: 'json'
        });
    });

    $("#remove").click(function () {
        var _id = $("#delete").find('input[name="_id"]').val();

        $.ajax({
            url: '/story/delete',
            type: 'post',
            data: JSON.stringify({_id: _id}),
            contentType: 'application/json',
            dataType: 'json'
        });
    });
});