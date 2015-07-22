/*!
    Test TagWire 1.0.3 - coxcore.com

    @author cox.ascript
*/
window.testResult = {
    errors: []
};

window.testUtils = {

    checkAttribute: function(name, $target, data, message) {

        var regWrap = /radio|checkbox/

        TagWire.oeach(data, function(val, attr) {

            var type = $target.attr('type'),
                attrValue;
            

            if (typeof val === 'boolean') {
                attrValue = $target.prop(attr);
            } else if ( attr === 'value' ) {
                attrValue = $target[0].value;
            } else {
                attrValue = TagWire.plugin('jQuery') && /^data-/.test(attr) ?
                    $target.data(attr.replace(/^data-/, '')):
                    $target.attr(attr);
            }

            if (attrValue !== val) {
                if (message === undefined) {
                    message = [
                        '<strong>',
                        $target[0].nodeName,
                        '</strong>의 <strong>',
                        attr,
                        '</strong> 속성값이 <strong>',
                        String(attrValue),
                        '</strong> 입니다.<br />&gt;&gt;&gt; <strong>',
                        String(val),
                        '</strong>'
                    ].join('');
                }

                testResult.errors.push('[' + name + '] : ' + message);

                if (regWrap.test(type)) {
                    $target.wrap($('<div></div>', { 'class': 'errorElement' }));
                } else {
                    $target.addClass('errorElement');
                }

            }

        });

    },

    checkText: function(name, $target, data, message) {

        var val = $target.html().toLowerCase().
            replace(/&lt;/g, '<').
            replace(/&gt;/g, '>').
            replace(/&amp;/g, '&').
            replace(/<br[^>]*>/gi, '').
            replace(/\n/g, '');
        data = data.toLowerCase().
            replace(/<br[^>]*>/gi, '').
            replace(/\n/g, '');

        if (val !== data) {
            if (message === undefined) {
                message = [
                    '<strong>',
                    $target[0].nodeName,
                    '</strong>의 <strong>',
                    '</strong> 텍스트 값이 <strong>',
                    val,
                    '</strong> 입니다.<br />&gt;&gt;&gt; <strong>',
                    data,
                    '</strong>'
                ].join('');
            }

            testResult.errors.push('[' + name + '] : ' + message);
            $target.addClass('errorElement');
        }

    },

    checkHtml: function(name, $target, data, message) {

        var val = $target.html().toLowerCase().
            replace(/&lt;/g, '<').
            replace(/&gt;/g, '>').
            replace(/&amp;/g, '&').
            replace(/<br[^>]*>/gi, '').
            replace(/<[^>]*$/, '').
            replace(/\n/g, '');
        data = data.toLowerCase().
            replace(/<br[^>]*>/gi, '').
            replace(/<[^>]*$/, '').
            replace(/\n/g, '');

        if (val !== data) {
            console.log(val);
            console.log(data);
            if (message === undefined) {
                message = [
                    '<strong>',
                    $target[0].nodeName,
                    '</strong>의 <strong>',
                    '</strong> html 값이 <strong>',
                    val,
                    '</strong> 입니다.<br />&gt;&gt;&gt; <strong>',
                    data,
                    '</strong>'
                ].join('');
            }

            testResult.errors.push('[' + name + '] : ' + message);
            $target.addClass('errorElement');
        }

    }

};

window.testData = {

    "_variable-attribute": {

        test: function(section) {

            var options = section.options;
            var $child = $(options.tag).children();
            var idx = 0;
            var dt = json.package;
            var arr = [
                { title : dt.project, href : dt.website },
                { custom: undefined },
                { custom: dt.project },
                { href: dt.website, title: dt.website, custom: dt.website },
                { 'data-website': dt.website },
                { 'data-homepage': dt.website },
                { value: dt.project },
                { value: dt.project },
                { checked: true },
                { checked: true }
            ];

            TagWire.each(arr, function(o, i) {
                testUtils.checkAttribute(options.titleValue, $child.eq(i), o);
            });
        }

    },


    "_variable-text": {
        test: function(section) {

            var options = section.options;
            var $pre = $(options.tag);
            var idx = 0;
            var dt = json.package;
            var arr = [
                'description',
                'spacialChar',
                'htmlStr',
                'project'
            ];

            TagWire.each(arr, function(s, i) {
                var $tar = $pre.find('._' + s + '-text');
                var val = String(dt[s]);
                testUtils.checkText(options.titleValue, $tar, val);
            });

        }
    },


    "_variable-html": {
        test: function(section) {
            var options = section.options;
            var $pre = $(options.tag);
            var idx = 0;
            var dt = json.package;
            var arr = [
                'htmlStr',
                'spacialChar'
            ];

            TagWire.each(arr, function(s, i) {
                var $tar = $pre.find('._' + s + '-html');
                var val = String(dt[s]);
                testUtils.checkHtml(options.titleValue, $tar, val);
            });
        }
    }

};