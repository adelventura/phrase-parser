#### How to Run

Install dependencies
`npm install`

To pass filenames directly: `node index.js [file1] [file2]`

- File1 and File2 should be the path to the file you'd like to process
- For example, `node index.js moby-dick.txt`

To pass an input through stdin: `cat [file] | node index.js`

- For example, `cat moby-dick.txt | node index.js`

#### Running in Docker container

1. Build: `docker build -t phrase-parser .`
2. Run: `docker run -e FILENAME="./moby-dick.txt" -p 3000:3000 phrase-parser`

`FILENAME` can accept a single file path or a comma-separated list of file paths

#### Running Tests

Running specific tests:
`npm test [testPath]`

- For example, `npm test tests/processors/`

Running all tests:
`npm test`

#### Summary

- The program can use file paths passed as a list of arguments or use input from stdin
- The program will find the 100 most common three-word sequences (case-insensitive, ignoring punctuation)
- The program can handle unicode characters such as "ü"
- The program reads the input via streams to avoid loading the full input into memory for processing and can process multiple files at once
- The program can be run in a docker container

#### Next steps

I think the main things I would do next if given more time are:

1. More error handling
   - For example, currently, the application requires you to provide a valid file path. With some more time, I would have liked to handle that more gracefully and provide a better response for invalid inputs.
2. More robust unit tests
   - I included some tests from the ReportGenerator, Processor, and FileProcessor. I also included a very basic test for the index file. Ideally I would like to also have tests for StdinProcessor and more tests for index. I think overall spending somre more time covering edge cases for unit tests for all files would be a good next step.
   - I would also look into resolving the jest log that shows up when you run all tests.
3. Variable sequence lengths
   - The processors are set up to be able to find sequences of a variable length. Right now, I'm using a constant value of 3 (SEQUENCE_LENGTH). With more time, I'd like to allow the user to specify what length of sequences they're interested in.
4. Variable report lengths
   -The report generator is also set up to accept length argument. Right now, it is being passed a constant REPORT_LENGTH. With more time, I think it would be nice to allow different length of reports to be selected.
5. Report styles

- Right now the reports are just printing to the console. The ReportGenerator could be switched out for different ones that print in a different format or print to file, etc

6. Look into additional performance improvements
