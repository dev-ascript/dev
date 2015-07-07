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
* ***`{function}`*** : 데이터를 사용할 속성 혹은 사용자 정의 함수입니다. `Tail Function` 이라고 부릅니다.

## Example

아래의 예제처럼 이미지의 링크를 동적으로 바꾸고 싶다면, 일반적으로 다음과 같은 방법을 사용합니다. 물론 `jQuery` 같은 라이브러리를 사용하면 더 쉽게 구현할 수 있습니다.

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

위 코드를 실행하면 다음과 같이 처리됩니다.

***`[Result]`***
```html
<h1>TagWire</h1>
<a id="sampleLink" href="http://coxcore.com/tagwire">
    <img id="sampleImg" src="/img/tagwire.png" alt="TagWire" />
</a>
```


***`TagWire`***를 사용하는 경우는 각 element의 class 속성에 필요한 형태의 *`_{variable name}-{function}`*을 추가하고, `TagWire.render` 함수를 이용하여 데이터를 반영합니다.

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


그런데 다른 element에서도 동일한 값을 사용해야 하는 경우, 일반적인 방법은 해당 부분을 적용하기 위한 javascript 코드를 추가해야 되지만, ***`TagWire`***는 필요한 element에 *`_{variable name}-{function}`* 형태의 class를 추가하는 것으로 해당 데이터를 반영할 수 있습니다.

***`[Native Code]`***
```html
<h1></h1>
<a id="sampleLink" href="#">
    <img id="sampleImg" src="" alt="" />
</a>


<!-- modify "TagWire : http://coxcore.com/tagwire" -->
<p id="sampleDesc"></p>


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
    
    
    // modify javascript
    var p = document.getElementById('sampleDesc');
    p.innerHTML = data.siteName + ' : ' + data.siteUrl;
</script>
```

***`[TagWire]`***
```html
<h1 class="_siteName-text"></h1>
<a class="_siteUrl-href" href="#">
    <img class="_imgPath-src _siteName-alt" src="" alt="" />
</a>


<!-- modify "TagWire : http://coxcore.com/tagwire" -->
<p class="_siteName-replace _siteUrl-replace">#siteName# : #siteUrl#</p>


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

## Purpose of Use
***`TagWire`***의 가장 큰 목적은, `HTML`, `javascript`, `서버사이드` 업무를 명확하게 분리하는 것입니다.

웹서비스 등을 개발할 때, 완성된 결과물은 대부분이 HTML 태그에 javascript 처리를 위한 코드, 서버사이드 언어가 혼합되어있는 형태입니다. 이는 초기에 `HTML` -> `javascript` -> `서버사이드` 형태로 개발이 진행될 때는 큰 문제가 없지만, 디자인 변경 같은 수정이 발생했을 때는 `HTML` 부터 발생하는 변경에 대해서 `javascrpt`, `서버사이드` 영역까지 영향을 주게 됩니다.

이를 개선하기 위해서 ***`TagWire`***를 사용하면, 다음과 같이 명확하게 업무를 분업할 수 있습니다.

`HTML`은 디자인에 맞게 화면을 구성한 후 어떤 데이터가 어디에 어떤 형태로 적용될지에 대한 작업만 합니다. 이미 개발된 페이지를 수정하는 경우는 실시간으로 수정되는 코드에 데이터가 반영되는 모습을 보면서 작업할 수 있게 됩니다.

`javascript`는 데이터가 적용되는 시점에 대한 작업을 합니다. 예를 들어, 사용자가 버튼을 `click` 했을 때, 데이터를 가져와서 화면에 `render` 하는 처리를 구현하는 것 같은 형태입니다. 어느 element에 어떻게 적용하는지는 이미 `HTML` 작업에서 구현되기 때문에 이 부분에 대한 구현은 하지 않아도 됩니다.

`서버사이드`는 화면에서 사용할 데이터를 관리하고 `JSON`으로 가공하여 `javascript`에서 호출할 수 있는 `API` 등을 만드는데 집중합니다. 이렇게 되면 `서버사이드` 영역은 화면의 변화에 대해서 영향을 받지 않게됩니다.
