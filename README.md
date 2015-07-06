## TagWire란?
웹을 통해 서비스하는 무언가를 만들 때, 사용자에게 보여지는 view를 개발하는 일반적인 방법은 Front-end 영역에서 디자인과 정보를 구조화하여 view(HTML, CSS)를 만들고, Back-end 영역에서는 그렇게 만들어진 코드를 참고하여 페이지를 구성하기 위한 개발을 합니다.

그러나 요건이 변경되고 디자인이 수정되면, 이미 개발된 페이지는 개발된 코드를 피해서 HTML을 수정하거나, 아예 변경된 디자인에 맞게 새로 HTML을 만들고, 거기에 맞춰 다시 서버사이드 개발을 하는 과정이 반복됩니다.
초기 단계에서 분업은 상당히 효율적이지만, 전체 과정이 한번 진행 된 이후에는 각 파트별로 수정사항을 반영하기 위해 많은 시간을 들여야합니다. 특히 개발파트의 경우는 back-end 개발도 하면서, 수시로 발생하는 view 영역의 수정에 대해서 반영하는 작업을 해야합니다.

이런 부분을 개선 할 수는 없을까요? Front-end 영역과 Back-end 영역을 분리해서 서로 영향이 없도록 작업할 수는 없을까요?

이렇게 시작된 고민은, 서버사이드 개발자가 HTML 수정에 영향을 덜받고, 웹퍼블리셔는 개발이 된 페이지를 좀 더 자유롭게 코딩을 하고, 수정할 수 있도록, view영역에는 순수한 HTML 태그만 존재해야 한다는 결론에 도달했습니다.

그리고 그 고민의 결과로 만들어진 것이 **`TagWire`** 입니다.

**`TagWire`**는 view 영역에서 사용할 dataset을 미리 정의해서, Back-end의 경우 dataset을 구현하고 처리하는데 집중하고, Front-end는 이 dataset을 가지고 HTML 태그를 구성하는데 집중합니다.



## 어떻게 사용하나요?
**`cox.TagWire.js`** 파일을 다운로드하여 사용할 페이지에 추가하세요.
아래 코드를 붙여넣기해도 됩니다.
```html
<script type="text/javascript" src="//coxcore.googlecode.com/svn/trunk/cox/cox.TagWire.js"></script>
```

**`TagWire`**는 HTML 태그의 `class` 속성에 다음과 같은 형식으로 추가하여 동작합니다.
```javascript
class="_{Data}-{Function}"
```
각 부분의 용도는 다음과 같습니다.
* **`_`** : TagWire와 일반 class를 구분하기 위한 구분자입니다.
* ***`{Data}`*** : 사용할 값의 변수명입니다.
* **`-`** : 변수명과 함수명을 구분하기 위한 구분자입니다.
* ***`{Function}`*** : 데이터를 사용할 속성 혹은 사용자 정의 함수입니다. `Tail Function` 이라고 부릅니다.
 
예를 들어 아래와 같이 정의된 `object`가 있다고 한다면,
```javascript
var data = {
	aaa : '제목',
	bbb : '이미지 경로',
	ccc : '링크'
};
```

`aaa`의 값을 `h1`에 텍스트로 입력할 때, 해당 변수명에 `-text`를 붙입니다.
```html
<h1 class="_aaa-text"></h1>
```

`bbb`의 값을 `img` 태그의 `src` 속성에 대입할 때, 해당 변수명에 `-src`를 붙입니다.
```html
<img class="_bbb-src" src="" />
```

만약 `img` 태그의 `alt` 속성에 `aaa` 값을 사용하고 싶다면 `-alt`를 추가합니다.
```html
<img class="_bbb-src _aaa-alt" src="" />
```

`ccc`의 값을 `a` 태그의 `href` 속성에 대입할 때, 해당 변수명에 `-href`를 붙입니다.
```html
<a href="#" class="_ccc-href">href 설정</a>
```

이제 데이터를 반영하려는 element에 `render` 합니다.
```javascript
TagWire.render( document.body, data );
```

혹시 `jQuery`를 사용하시나요?
```javascript
jQuery( 'body' ).render( data );
```

지금까지의 코드를 종합해봅시다.
```html
<div id="wrapper">
  <h1 class="_aaa-text"></h1>
  <a class="_ccc-href" href="#">
    <img class="_bbb-src _aaa-alt" src="" alt="" />
  </a>
</div>

<script type="text/javascript">
  // 적용할 데이터
  var data = {
  	aaa : '제목',
  	bbb : '이미지 경로',
  	ccc : '링크'
  };

  // #wrapper 에 데이터를 반영
  TagWire.render( document.getElementById('wrapper'), data );
</script>
```

위 코드를 실행하면 다음과 같이 처리됩니다.
```html
<div id="wrapper">
  <h1 class="_aaa-text">제목</h1>
  <a class="_ccc-href" href="링크">
    <img class="_bbb-src _aaa-alt" src="이미지 경로" alt="제목" />
  </a>
</div>
```
