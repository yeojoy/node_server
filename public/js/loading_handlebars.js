var Template = function () {
    this.cached = {};
};
var T = new Template();
$.extend(Template.prototype, {
    render: function(name, callback) {
        if (T.isCached(name)) {
            callback(T.cached[name]);
        } else {
            $.get(T.urlFor(name), function(raw) {
                T.store(name, raw);
                T.render(name, callback);
            });
        }
    },
    renderSync: function(name, callback) {
        if (!T.isCached(name)) {
            T.fetch(name);
        }
        T.render(name, callback);
    },
    prefetch: function(name) {
        $.get(T.urlFor(name), function(raw) { 
            T.store(name, raw);
        });
    },
    fetch: function(name) {
        // synchronous, for those times when you need it.
        if (! T.isCached(name)) {
            var raw = $.ajax({'url': T.urlFor(name), 'async': false}).responseText;
            T.store(name, raw);         
        }
    },
    isCached: function(name) {
        return !!T.cached[name];
    },
    store: function(name, raw) {
        T.cached[name] = Handlebars.compile(raw);
    },
    urlFor: function(name) {
        return "js/"+ name + ".handlebars";
    }
});

Handlebars.registerHelper("ifCond",function(v1,operator,v2,options) {
    switch (operator)
    {
        case "==":
            return (v1==v2)?options.fn(this):options.inverse(this);

        case "!=":
            return (v1!=v2)?options.fn(this):options.inverse(this);

        case "===":
            return (v1===v2)?options.fn(this):options.inverse(this);

        case "!==":
            return (v1!==v2)?options.fn(this):options.inverse(this);

        case "&&":
            return (v1&&v2)?options.fn(this):options.inverse(this);

        case "||":
            return (v1||v2)?options.fn(this):options.inverse(this);

        case "<":
            return (v1<v2)?options.fn(this):options.inverse(this);

        case "<=":
            return (v1<=v2)?options.fn(this):options.inverse(this);

        case ">":
            return (v1>v2)?options.fn(this):options.inverse(this);

        case ">=":
         return (v1>=v2)?options.fn(this):options.inverse(this);

        default:
            return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
    }
});


function convertJsonToHtml(type, sup, sub, n) {
	var result = '';
	if (type === 'frac') {
		// TODO n으로 글자 크기를 조절한다.		
		result += '<span class="frac"><span class="sup">';
		for (var i in sup) {
			if (sup[i].type === 'input') {
				// TODO Input element
				result += '<input class="input" type="' + sup[i].style + '" id="' + sup[i].id +
						'" placeholder="' + sup[i].value + '" style="width: ' + sup[i].width +
						'px;" />';
			} else if (sup[i].type === 'text') {
				// TODO TEXT
				result += '<span class="'+ sup[i].type +'">' + sup[i].value + '</span>';
			} else {
				result += convertJsonToHtml(sup[i].type, sup[i].sup, sup[i].sub,n+1);
			}
		}
		// TODO n으로 글자 크기를 조절한다.
		result += '</span><span class="sub">';
		
		for (var i in sub) {
			if (sub[i].type === 'input') {
				// TODO Input element
				result += '<input class="input" type="' + sub[i].style + '" id="' + sub[i].id +
						'" placeholder="' + sub[i].value + '" style="width: ' + sub[i].width +
						'px;" />';
			} else if (sub[i].type === 'text') {
				// TODO TEXT
				result += '<span class="' + sub[i].type + '">' + sub[i].value + '</span>';
			} else {
				result += convertJsonToHtml(sub[i].type, sub[i].sup, sub[i].sub,n+1);
			}
		}
		result += '</span></span>';
		console.log("result :\n" + result);
		return result;
	}
}

Handlebars.registerHelper("getMathHtml", function(type, sup, sub) {
	console.log("getMathHtml()");
	return new Handlebars.SafeString(convertJsonToHtml(type, sup, sub,1));
});