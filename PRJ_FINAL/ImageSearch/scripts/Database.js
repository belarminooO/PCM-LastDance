/**
 * @fileoverview Classes for managing JSON data from a file or local storage.
 * Provides methods to load, search, save, and retrieve JSON data efficiently.
 */

/**
 * Class to handle JSON data from an external file.
 */
class DatabaseJSON {
    /**
     * Constructor for the DatabaseJSON class.
     * Currently, no initialization is required.
     */
    constructor() {}

    /**
     * Loads a JSON file asynchronously and parses its contents.
     * 
     * @async
     * @param {string} filename - The path to the JSON file to load.
     * @returns {Promise<Object>} A promise resolving to the parsed JSON object.
     * @throws Will log an error if the file cannot be fetched or parsed.
     */
    async loadFile(filename) {
        let jsonData = {}; // Placeholder for the parsed JSON data

        try {
            // Fetch the file from the specified path
            const response = await fetch(filename);

            // Read the response as text
            const jsonString = await response.text();

            // Parse the text into a JSON object
            jsonData = JSON.parse(jsonString);
        } catch (error) {
            // Log any errors during the fetch or parse operation
            console.error('Error loading JSON file:', error);
        }

        return jsonData; // Return the parsed JSON data
    }

    /**
     * Searches through the JSON data for images matching a query.
     * 
     * @param {string} query - The search query. A query starting with "#" filters by dominant color; otherwise, filters by class.
     * @param {Object} jsonData - The JSON data containing the images to search.
     * @param {number} maxResults - The maximum number of results to return.
     * @returns {string[]} An array of file paths for matched images.
     */
    search(query, jsonData, maxResults) {
    console.log("+++++++AAAAAAAAAAAENTROUAAAAAAAAAAAAA+++++++++");
    console.log(jsonData);
    console.log("+++++++AAAAAAAAAAAAAAAAAAAAA+++++++++");
    let imagesMatched = []; // Variável declarada no início

    // Normaliza a query para evitar problemas com maiúsculas/minúsculas
    const normalizedQuery = query.trim().toLowerCase();

    // Determina o critério de pesquisa
    if (normalizedQuery.startsWith("#")) {
        // Busca pela cor dominante (removendo o '#' da query)
        const colorQuery = normalizedQuery.substring(1);

        // Iterar pelas imagens no jsonData
        for (const image of jsonData.images || []) {
            if (image.class.toLowerCase() === colorQuery) {
                imagesMatched.push(image);
            }
        }

        console.log("+++++++RESULTADOOOOOOOOOOOO+++++++++");
        console.log(imagesMatched);
        console.log("+++++++RESULTADOOOOOOOOOOOO+++++++++");
    } else {
        // Busca pela classe (título/categoria)
        for (const im of jsonData.images || []) {
            if (im.class && im.class.toLowerCase().includes(normalizedQuery)) {
                imagesMatched.push(im);
            }
        }
        let diff = imagesMatched.length - maxResults;
        while (diff > 0) {
            imagesMatched.pop(); // Remove o último elemento do array
            diff--;
        }
    }

    // Calcula a diferença e ajusta o tamanho do array removendo do final

    // Extrai apenas os caminhos das imagens restantes
    const imagePaths = imagesMatched.map(im => im.path);

    // Logs para depuração
    console.log("Critério de busca:", normalizedQuery.startsWith("#") ? "Cor dominante" : "Classe");
    console.log("Resultados encontrados:", imagesMatched);
    console.log("Caminhos retornados:", imagePaths);

    return imagePaths;
}


    // search(query, jsonData, maxResults) {
    //     console.log("debug -  DatabaseJSON Search");
    //     let imagesMatched = []; // Array to hold matched images

    //     // Determine the search criteria: filter by dominant color or class
    //     if (query.startsWith("#")) {
    //         imagesMatched = jsonData.images.filter(im => im.dominantcolor === query);
    //     } else {
    //         imagesMatched = jsonData.images.filter(im => im.class === query);
    //     }

    //     // Limit the number of results to maxResults or the total matches, whichever is smaller
    //     maxResults = Math.min(maxResults, imagesMatched.length);

    //     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    //     console.log(imagesMatched);
    //     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    //     console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    //     console.log(imagesMatched.slice(0, maxResults).map(im => im.path));
    //     console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");

    //     // Extract and return the file paths of the matched images
    //     return imagesMatched.slice(0, maxResults).map(im => im.path);
    // }
    
}

/**
 * Class to manage JSON data stored in the browser's localStorage.
 */
class LocalStorageDatabaseJSON {
    /**
     * Constructor for the LocalStorageDatabaseJSON class.
     * Currently, no initialization is required.
     */
    constructor() {}

    /**
     * Saves a JSON object into localStorage under a specified key.
     * 
     * @param {string} keyname - The key under which the JSON object will be stored.
     * @param {Object} jsonObject - The JSON object to store.
     * @throws Will log an error if saving to localStorage fails.
     */
    save(keyname, jsonObject) {
        try {
            // Convert the JSON object to a string and save it in localStorage
            localStorage.setItem(keyname, JSON.stringify(jsonObject));
        } catch (e) {
            // Log any errors encountered during the save operation
            console.error('Save failed:', e.name);
        }
    }

    /**
     * Reads a JSON object from localStorage using a specified key.
     * 
     * @param {string} keyname - The key of the JSON object to retrieve.
     * @returns {Object} The parsed JSON object.
     * @throws Will throw an error if the key is not found in localStorage.
     */
    read(keyname) {
        console.log("Tentando acessar a chave no localStorage:", keyname);
    
        // Lista todas as chaves disponíveis no localStorage
        const availableKeys = Object.keys(localStorage);
        console.log("Chaves disponíveis no localStorage:", availableKeys);
    
        // Recupera o valor da chave fornecida
        const localStorageJson = localStorage.getItem(keyname);
    
        // Inicializa a variável similarKeys fora do bloco if
        let similarKeys = [];
    
        // Verifica se a chave existe
        if (localStorageJson === null) {
            console.error(`A chave "${keyname}" não foi encontrada no localStorage.`);
    
            // Sugere possíveis correspondências
            similarKeys = availableKeys.filter(key =>
                key.toLowerCase().includes(keyname.toLowerCase())
            );
    
            if (similarKeys.length > 0) {
                console.warn("Talvez você quis dizer:", similarKeys);
    
                // Recupera o valor da primeira chave similar encontrada
                const localStorageJson2 = localStorage.getItem(similarKeys[0]);
    
                console.log("SIMILARES ENCONTRADAS:", localStorageJson2);
                console.log("Valor encontrado no localStorage:", localStorageJson2);
    
                return JSON.parse(localStorageJson2); // Retorna o valor do similar
            }
        } else {
            console.log("Valor encontrado no localStorage:", localStorageJson);
            return JSON.parse(localStorageJson); // Retorna o valor original
        }
    
        // Caso nenhuma chave similar seja encontrada, retorna null ou lança erro
        console.warn("Nenhuma chave similar foi encontrada.");
        return null;
    }
    
    
    
    /**
     * Checks if localStorage is empty.
     * 
     * @returns {boolean} True if localStorage contains no keys, false otherwise.
     */
    isEmpty() {
        return localStorage.length === 0;
    }
}

// Export the classes for use in other modules
export { LocalStorageDatabaseJSON, DatabaseJSON };
