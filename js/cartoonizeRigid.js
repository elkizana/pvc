import * as THREE from './three.module.js';
import { LineSegmentsGeometry } from './LineSegmentsGeometry.js';
import { LineSegments2 } from './LineSegments2.js';
import { LineMaterial } from './LineMaterial.js';
import {  scene } from './initThree.js';
export let  playerThreeMeshFullGroup
export let  fullGroupAnimated = []
export let  fullGroupRigid = []

export function cartoonizeRigid( sourceList) { 

    let threshold = 11 
   // const DARK_LINES = 0x000000
    const white = 0xffffff 
    const black = 0x000000
    const blue =     0x04153d
    const red =     0x8c071b


    sourceList.forEach(rigidMesh => {

    let rigidMeshGeometry = rigidMesh.geometry
    rigidMeshGeometry.applyMatrix4( rigidMesh.matrixWorld );
    rigidMeshGeometry.center()
    const mesh = new THREE.Mesh( rigidMeshGeometry );
    const DARK_LINES = (rigidMesh.name.endsWith("grey") || rigidMesh.material.name == "grey" ) ? 0xffffff: 0x000000 ;
        

///Lines
/*     let lineGeom = new THREE.EdgesGeometry( rigidMeshGeometry , threshold );
    const line = new THREE.LineSegments( lineGeom, new THREE.LineBasicMaterial( { color: black } ) );
    line.position.copy( mesh.position );
    line.scale.copy( mesh.scale );
    line.rotation.copy( mesh.rotation ); */
////thickLines
     let lineGeom = new THREE.EdgesGeometry( rigidMeshGeometry , threshold );
    const thickLineGeom = new LineSegmentsGeometry().fromEdgesGeometry( lineGeom );
    let thickLines = new LineSegments2( thickLineGeom, new LineMaterial( { color: black, linewidth: .001 } ) );
    thickLines.position.copy( mesh.position );
    thickLines.scale.copy( mesh.scale );
    thickLines.rotation.copy( mesh.rotation ); 
    const fullGroup = new THREE.Group();
  
    const linesGroup = new THREE.Group();
 
    if (rigidMesh.name == "ball") {
         thickLines = new LineSegments2( thickLineGeom, new LineMaterial( { color: black, linewidth: .001 } ) );

        mesh.material = new THREE.MeshBasicMaterial( { color: white} );
        
    }
    else if ( rigidMesh.name.endsWith("grey")/*  == "kaabafloortraining" */ )  { 
        mesh.material.opacity = 1
        mesh.material = new THREE.MeshBasicMaterial( { color: red } );
    }
    else if ( rigidMesh.name.endsWith("aaaaapole")/*  == "kaabafloortraining" */ )  { 
        mesh.material.opacity = 1
        mesh.material = new THREE.MeshBasicMaterial( { color: red } );
    }

    else { 
    mesh.material = new THREE.MeshBasicMaterial( { color: white } );
    
    mesh.material.polygonOffset = true;
    mesh.material.polygonOffsetFactor = 1;
    mesh.material.polygonOffsetUnits = 1;
    mesh.renderOrder = 2;
    mesh.material.transparent = true
    mesh.material.opacity = 0.8
}


    //linesGroup.add(thickLines)
    //fullGroup.add( linesGroup );
    fullGroup.add( mesh ,   thickLines);
     


if (rigidMesh.name == "ball") {
    playerThreeMeshFullGroup = fullGroup
} 
else if (rigidMesh.material.name == "animated") { 
    fullGroupAnimated.push(fullGroup)
}
else  {
    fullGroupRigid.push(fullGroup)
}
 

    scene.add(fullGroup)



});












}