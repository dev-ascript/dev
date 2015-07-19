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
                console.log(attrValue);
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

    }

};