function poligonoVertices(lado, n, h){
    //Generacion Vectores
    var vertices = [];
    var a = (2*Math.PI) / n;
        for(var i = 0; i <= n; i++){
            x = lado * Math.cos(i*a);
            y = h;
            z = lado * Math.sin(i*a);
            vertices[i]=[x, y, z];
        }
        return vertices;
    }
    function poligonoGeometria(ver, geo){
        //Generacion Geometrias por medio de vectores
        var x = new THREE.Vector3(1, 0, 0);
        var y = new THREE.Vector3(0, 1, 0);
        var z = new THREE.Vector3(0, 0, 1);
        var base = new THREE.Geometry();
        if(geo != null){
            base = geo;
        }
        var vertices = ver;
        var larVer = vertices.length;
        for(var i = 0; i < larVer; i++){
            x = vertices[i][0];
            y = vertices[i][1];
            z = vertices[i][2];
            var vector = new THREE.Vector3(x, y, z);
            base.vertices.push(vector);
        }
        return base;
    }
    function poliedro(lado1, lado2, n, h, color) {
        // Generación de vértices
        var base1ver = poligonoVertices(lado1, n, 0);
        var base2ver = poligonoVertices(lado2, n, h);

        // Generación de geometrías
        var base1 = poligonoGeometria(base1ver);
        var base2 = poligonoGeometria(base2ver);

        // Creación de la geometría final
        var geometria = new THREE.Geometry();

        // Agregar los vértices de las bases a la geometría
        geometria.merge(base1);
        geometria.merge(base2);

        // Agregar las caras de la pirámide
        for (var i = 0; i < n; i++) {
            // Caras laterales
            geometria.faces.push(new THREE.Face3(i, i + 1, i + n + 1));
            geometria.faces.push(new THREE.Face3(i + 1, i + n + 2, i + n + 1));
        }

        // Caras de la base inferior
        for (var i = 1; i <= n - 2; i++) {
            geometria.faces.push(new THREE.Face3(0, i, i + 1));
        }

        // Caras de la base superior
        var lastIndex = 2 * n + 1;
        for (var i = n + 1; i <= lastIndex - 2; i++) {
            geometria.faces.push(new THREE.Face3(lastIndex, i + 1, i));
        }

        // Calcular las normales de las caras y los vértices
        geometria.computeFaceNormals();
        geometria.computeVertexNormals();

        // Creación del material
        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });

        // Creación de la malla
        var Piramide = new THREE.Mesh(geometria, material);

        return Piramide;
    }