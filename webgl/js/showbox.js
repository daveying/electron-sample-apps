
// 3D code partially grabbed from http://dev.opera.com/articles/view/porting-3d-graphics-to-the-web-webgl-intro-part-2/

const fs = require('fs');

document.addEventListener('DOMContentLoaded', function() {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    var animationLoopId;
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true 
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var animate = function () {
        animationLoopId = requestAnimationFrame( animate );

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    animate();

    // setTimeout(function () {
    //     cancelAnimationFrame(animationLoopId);
    // }, 100);

    setTimeout(saveIamge, 200);

    function saveIamge () {
      if (!renderer) {
        return;
      }

      let base64 = renderer.domElement.toDataURL('image/png');
      var base64Data = base64.replace(/^data:image\/png;base64,/, "");
      //console.log(base64);
      
      fs.writeFile("./logo.png", base64Data, 'base64', function (err) {
        console.log(err);
      });

    }

});

