import * as scran from 'scran.js';

scran.initialize()
    .then(() => {
        console.log("here");
        let numberOfRows = 100;
        let numberOfColumns = 100;

        var buffer = new scran.Int32WasmArray(numberOfRows * numberOfColumns);
        let output;

        try {
            var x = buffer.array();
            for (var c = 0; c < numberOfColumns; c++) {
                for (var r = 0; r < numberOfRows; r++) {
                    if (Math.random() <= density) {
                        x[r + c * numberOfRows] = Math.random() * maxValue;
                    } else {
                        x[r + c * numberOfRows] = 0; // need this, otherwise it would be uninitialized.
                    }
                }
            }

            output = scran.initializeSparseMatrixFromDenseArray(numberOfRows, numberOfColumns, buffer);
        } finally {
            buffer.free();
        }

        console.log(output);
    });