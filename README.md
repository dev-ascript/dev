## About TagWire

***`TagWire`***는 데이터를 HTML 태그에 반영하기 쉽게 도와주는 javascript library 입니다.

HTML 태그의 `class` 속성에 다음과 같은 형식으로 추가하여 동작합니다.
```javascript
class="_{variable name}-{function}"
```


각 부분의 용도는 다음과 같습니다.
* **`_`** : 일반 class와 ***`TagWire`***를 구분하기 위한 구분자입니다.
* ***`{variable name}`*** : 사용할 값의 변수명입니다.
* **`-`** : 변수명과 함수명을 구분하기 위한 구분자입니다.
* ***`{function}`*** : 데이터를 사용할 속성 혹은 사용자 정의 함수입니다. `Tail Function` 이라고 부릅니다.

## Example

예를들어 아래의 예제처럼 이미지의 링크를 동적으로 바꾸고 싶다면, 일반적으로 다음과 같은 방법을 사용할 것입니다. 물론 `jQuery` 같은 라이브러리를 사용하면 더 쉽게 구현할 수 있을겁니다.

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

그러면 다음과 같이 처리됩니다.
```html
<h1>TagWire</h1>
<a id="sampleLink" href="http://coxcore.com/tagwire">
    <img id="sampleImg" src="/img/tagwire.png" alt="TagWire" />
</a>
```

***`TagWire`***를 사용하면 다음과 같습니다.
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


그런데 같은 값을 다른 곳에도 사용해야 하는 경우, 일반적인 방법은 해당 부분을 적용하기 위한 javascript 코드를 수정해야 되지만, ***`TagWire`***를 사용하면 필요한 element에 *`_{variable name}-{function}`* 형태의 class를 추가하는 것으로 해당 데이터를 반영할 수 있습니다.

***`Native Code`***
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

***`TagWire`***
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
