## About TagWire

***`TagWire`***는 데이터를 HTML 태그에 반영하기 쉽게 도와주는 javascript library 입니다.

HTML 태그의 class 속성에 다음과 같은 형식으로 추가하여 동작합니다.
```javascript
class="_{variable name}-{function}"
```

각 부분의 용도는 다음과 같습니다.
* **`_`** : 일반 class와 ***`TagWire`***를 구분하기 위한 구분자입니다.
* ***`{variable name}`*** : 사용할 값의 변수명입니다.
* **`-`** : 변수명과 함수명을 구분하기 위한 구분자입니다.
* ***`{function}`*** : 데이터를 사용할 속성 혹은 사용자 정의 함수입니다. *Tail Function* 이라고 부릅니다.

추가정보
* Homepage : http://coxcore.com/tagwire/
* Documentation : http://coxcore.com/tagwire/doc/

## How to Use?

먼저, 처리하고자 하는 값들의 `dataset`을 정의합니다. Javascript object로 변환할 수 있으면 어떤 것이든 상관 없습니다.

```javascript
var data = {
	siteUrl : 'http://coxcore.com/tagwire',
	siteName : 'TagWire',
	imgPath : '/img/tagwire.png'
};
```

`dataset`이 만들어지면, 이 값을 참고하여 HTML에 필요한 형식의 class를 추가합니다.

예를들어 `siteUrl` 값을 `a` 태그의 `href` 속성에 추가하려면 `-href`를 이용합니다.
```html
<a class="_siteUrl-href">링크</a>
```

`imgPath` 값을 `img` 태그의 `src` 속성에 추가하려면 `-src`를 이용합니다.
```html
<img class="_imgPath-src" />
```

이처럼 HTML 태그의 모든 attribute는 *`_{variable name}-{attribute}`* 형태로 사용가능합니다.

***`TagWire`***에는 attribute를 설정하는 것 외에도, 특수한 기능을 하는 기본 *Tail Function*이 몇가지 정의되어 있습니다.

예를 들어 `siteName` 값을 `p` 태그의 텍스트로 입력하려면 `-text`를 이용합니다.
```html
<p class="_siteName-text"><p>
```

`siteName` 값이 `true`일 때 `p` 태그를 노출하고, `false`일 때 숨기려면 `-show`를 이용합니다.
```html
<p class="_siteName-show"><p>
```

뿐만 아니라 사용자가 직접 이런 *Tail Function*을 정의할 수도 있습니다.
```javascript
TagWire.tail.example = function(target, value, name) {
    // code..
};
```

그러면 아래와 같은 형태로 사용이 가능합니다.
```html
<p class="_siteName-example"><p>
```

*Tail Function* 파라미터
* **target** : *`_siteName-example`*을 설정한 element 입니다.
* **value** : 변수 `siteName` 의 값 `"TagWire"` 입니다.
* **name** : 변수명 `siteName` 입니다.


이제 처음에 정의했던 `dataset`을 `TagWire.render` 함수를 사용하여 적용합니다.
```javascript
TagWire.render(document.body, data);
```

`jQuery`를 사용한다면 `render` plugin을 사용할 수 있습니다.
```javascript
jQuery('body').render(data);
```

`render`가 이미 사용중인가요? `tagwire`를 사용하세요.
```javascript
jQuery('body').tagwire(data);
```


## Example

***`[Native Code]`***
```html
<h1></h1>
<a id="sampleLink" href="#">
    <img id="sampleImg" src="" alt="" />
</a>


<script type="text/javascript">
    var data = {
    	siteUrl : 'http://coxcore.com/tagwire',
    	siteName : 'TagWire',
    	imgPath : '/img/tagwire.png'
    };
    
    var h1 = document.getElementsByTagName('h1');
    var a = document.getElementById('sampleLink');
    var img = document.getElementById('sampleImg');
    
    // apply 'data'
    h1.innerHTML = data.siteName;
    a.setAttribute('href', data.siteUrl);
    img.setAttribute('src', data.imgPath);
    img.setAttribute('alt', data.siteName);
</script>
```

***`[Result]`***
```html
<h1>TagWire</h1>
<a id="sampleLink" href="http://coxcore.com/tagwire">
    <img id="sampleImg" src="/img/tagwire.png" alt="TagWire" />
</a>
```

***`[TagWire]`***
```html
<h1 class="_siteName-text"></h1>
<a class="_siteUrl-href" href="#">
    <img class="_imgPath-src _siteName-alt" src="" alt="" />
</a>


<script type="text/javascript">
    var data = {
    	siteUrl : 'http://coxcore.com/tagwire',
    	siteName : 'TagWire',
    	imgPath : '/img/tagwire.png'
    };

    // apply 'data'
    TagWire.render(document.body, data); 
</script>
```

***`[Result]`***
```html
<h1 class="_siteName-text">TagWire</h1>
<a class="_siteUrl-href" href="http://coxcore.com/tagwire">
    <img class="_imgPath-src _siteName-alt" src="/img/tagwire.png" alt="TagWire" />
</a>
```


## Purpose of Use
***`TagWire`***의 가장 큰 목적은, ***`HTML`***, ***`javascript`***, ***`서버사이드`*** 업무를 명확하게 분리하는 것입니다.

웹서비스 등을 개발할 때, 완성된 결과물은 대부분이 HTML 태그에 javascript 처리를 위한 코드, 서버사이드 코드가 혼합되어있는 형태입니다. 이는 최초 ***`HTML`*** -> ***`javascript`*** -> ***`서버사이드`*** 형태로 업무가 진행될 때는 큰 문제가 없지만, 한번 개발된 페이지의 디자인 변경 같은 수정이 발생했을 때는 ***`HTML`*** 부터 발생하는 변경에 대해서 ***`javascrpt`***, ***`서버사이드`*** 영역까지 영향을 주게 됩니다.

이를 개선하기 위해서 ***`TagWire`***를 사용하면, 다음과 같이 업무를 구분합니다.

* ***`HTML`*** : 디자인에 맞게 화면을 구성한 후 어떤 데이터가 어디에 어떤 형태로 적용될지에 대한 작업만 합니다. 이미 개발된 페이지를 수정하는 경우는 실시간으로 수정되는 코드에 데이터가 반영되는 모습을 보면서 작업할 수 있게 됩니다.

* ***`javascript`*** : 데이터가 적용되는 시점에 대한 작업을 합니다. 예를 들어, 사용자가 버튼을 `click` 했을 때, 데이터를 가져와서 화면에 `render` 하는 처리를 구현하는 것 같은 형태입니다. 어느 element에 어떻게 적용하는지는 이미 ***`HTML`*** 작업에서 구현되기 때문에 이 부분에 대한 구현은 하지 않아도 됩니다.

* ***`서버사이드`*** : 화면에서 사용할 데이터를 관리하고 JSON으로 가공하여 ***`javascript`***에서 호출할 수 있는 API 등을 만드는데 집중합니다. ***`서버사이드`*** 영역은 ***`TagWire`***로 처리되는 부분에 대해서는 화면의 변화에 대해서 영향을 받지 않게됩니다.
