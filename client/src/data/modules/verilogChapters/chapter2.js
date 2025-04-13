const chapter2 = {
  id: 2,
  title: "Verilog Fundamentals",
  description: "Learn the basic building blocks and syntax of Verilog HDL",
  estimatedTime: "1 hours",
  completed: false,
  sections: [
    {
      id: "2.1",
      title: "Lexical Conventions",
      content: `
        <h3>Identifiers, Keywords, and Comments</h3>
        <p>Like any language, Verilog has specific rules for how code is written and structured. Understanding these conventions is essential for writing valid Verilog code.</p>
        
        <h4>Identifiers</h4>
        <p>Identifiers are names given to modules, variables, signals, and other objects in Verilog:</p>
        <ul>
          <li>Must begin with a letter or underscore</li>
          <li>Can contain letters, digits, underscores, and dollar signs</li>
          <li>Cannot be a reserved keyword</li>
          <li>Are case-sensitive</li>
        </ul>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #6a0dad; margin: 20px 0;">
          <h4>Valid Identifiers</h4>
          <code>counter</code>, <code>data_bus</code>, <code>_temp</code>, <code>addr32</code>, <code>RST_N</code>
          
          <h4>Invalid Identifiers</h4>
          <code>2counter</code> (starts with a digit)<br>
          <code>data-bus</code> (contains hyphen)<br>
          <code>module</code> (reserved keyword)
        </div>
        
        <h4>Keywords</h4>
        <p>Verilog has reserved keywords with special meanings that cannot be used as identifiers:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse; font-size: 0.9em;">
          <tr style="background-color:#f0f0f0">
            <th colspan="5">Common Verilog Keywords</th>
          </tr>
          <tr>
            <td>module</td>
            <td>endmodule</td>
            <td>input</td>
            <td>output</td>
            <td>inout</td>
          </tr>
          <tr>
            <td>wire</td>
            <td>reg</td>
            <td>always</td>
            <td>assign</td>
            <td>initial</td>
          </tr>
          <tr>
            <td>begin</td>
            <td>end</td>
            <td>if</td>
            <td>else</td>
            <td>case</td>
          </tr>
          <tr>
            <td>endcase</td>
            <td>for</td>
            <td>while</td>
            <td>parameter</td>
            <td>localparam</td>
          </tr>
        </table>
        
        <h4>Comments</h4>
        <p>Comments are non-executable text included for documentation:</p>
        <ul>
          <li><strong>Single-line comments</strong>: Start with <code>//</code> and continue to the end of the line</li>
          <li><strong>Multi-line comments</strong>: Start with <code>/*</code> and end with <code>*/</code></li>
        </ul>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // This is a single-line comment<br><br>
          
          /* This is a<br>
             multi-line comment<br>
             that spans several lines */<br><br>
          
          module example(); // Comments can appear after code<br>
          // ...<br>
          endmodule
        </div>
        
        <h4>Case Sensitivity</h4>
        <p>Verilog is case-sensitive, meaning that identifiers with different capitalization are treated as different entities:</p>
        <ul>
          <li><code>Data</code>, <code>DATA</code>, and <code>data</code> are three different identifiers</li>
          <li>Keywords must be lowercase (<code>module</code>, not <code>MODULE</code>)</li>
          <li>Consistent capitalization conventions improve readability</li>
        </ul>
        
        <p>Common conventions include:</p>
        <ul>
          <li>All lowercase for module names and signals: <code>alu</code>, <code>counter</code></li>
          <li>Uppercase for parameters and constants: <code>DATA_WIDTH</code>, <code>IDLE</code></li>
          <li>Camel case for complex names: <code>addrDecoder</code>, <code>dataValid</code></li>
        </ul>
      `
    },
    {
      id: "2.2",
      title: "Data Types & Nets",
      content: `
        <h3>Verilog Data Types and Nets</h3>
        <p>Data types in Verilog represent different kinds of hardware elements. Understanding the appropriate type for each signal is crucial for creating synthesizable designs.</p>
        
        <h4>Primary Data Types</h4>
        <p>Verilog has two main categories of data types:</p>
        <ol>
          <li><strong>Net types</strong>: Represent physical connections (wires) between hardware elements</li>
          <li><strong>Variable types</strong>: Represent storage elements (registers, memory)</li>
        </ol>
        
        <h4>Net Types</h4>
        <p>Net types model physical connections in hardware:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Net Type</th>
            <th>Description</th>
            <th>Common Use</th>
          </tr>
          <tr>
            <td><code>wire</code></td>
            <td>Basic connection with no signal storage</td>
            <td>Connects module ports and combinational logic</td>
          </tr>
          <tr>
            <td><code>tri</code></td>
            <td>Same as wire, used for tri-state nets</td>
            <td>Multiple drivers with enable controls</td>
          </tr>
          <tr>
            <td><code>wand</code>, <code>triand</code></td>
            <td>Wired-AND connection</td>
            <td>Logic where multiple drivers must all be high</td>
          </tr>
          <tr>
            <td><code>wor</code>, <code>trior</code></td>
            <td>Wired-OR connection</td>
            <td>Logic where any driver can pull high</td>
          </tr>
          <tr>
            <td><code>supply0</code>, <code>supply1</code></td>
            <td>Logical connections to power (1) or ground (0)</td>
            <td>Permanent voltage connections</td>
          </tr>
        </table>
        
        <p><code>wire</code> is by far the most common net type used in Verilog designs.</p>
        
        <h4>Variable Types</h4>
        <p>Variable types represent storage elements:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Variable Type</th>
            <th>Description</th>
            <th>Common Use</th>
          </tr>
          <tr>
            <td><code>reg</code></td>
            <td>Storage element that holds value until changed</td>
            <td>Flip-flops, latches, or procedural variables</td>
          </tr>
          <tr>
            <td><code>integer</code></td>
            <td>32-bit signed general-purpose variable</td>
            <td>Loop counters, procedural calculations</td>
          </tr>
          <tr>
            <td><code>real</code></td>
            <td>Floating-point value</td>
            <td>Testbench calculations (not synthesizable)</td>
          </tr>
          <tr>
            <td><code>time</code></td>
            <td>64-bit unsigned for simulation time</td>
            <td>Timing measurements in testbenches</td>
          </tr>
        </table>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Important Note on "reg"</h4>
          <p>Despite its name, a <code>reg</code> does not necessarily represent a hardware register or flip-flop. It's simply a variable that retains its value in procedural blocks:</p>
          <ul>
            <li>A <code>reg</code> in an <code>always @(posedge clk)</code> block typically becomes a flip-flop</li>
            <li>A <code>reg</code> in an <code>always @*</code> block typically becomes combinational logic</li>
          </ul>
          <p>The name "reg" is somewhat misleading and has led to confusion for many Verilog beginners.</p>
        </div>
        
        <h4>Bit-Width Declarations</h4>
        <p>Verilog allows you to specify the number of bits in a data type:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Single-bit signals<br>
          wire enable;<br>
          reg reset;<br><br>
          
          // Multi-bit vectors<br>
          wire [7:0] data_bus; // 8-bit bus (bits 7 down to 0)<br>
          reg [31:0] register; // 32-bit register<br><br>
          
          // Part select and bit select<br>
          assign lower_byte = register[7:0]; // Select bits 7 through 0<br>
          assign parity_bit = data_bus[0]; // Select just bit 0
        </div>
        
        <h4>Signed vs. Unsigned Types</h4>
        <p>By default, Verilog treats all nets and variables as unsigned. For signed arithmetic, use the <code>signed</code> keyword:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Unsigned (default)<br>
          reg [7:0] unsigned_value; // Range: 0 to 255<br><br>
          
          // Signed<br>
          reg signed [7:0] signed_value; // Range: -128 to 127
        </div>
        
        <p>This distinction is important for operations like division, comparison, and right-shifting, where the behavior differs for signed and unsigned values.</p>
      `
    },
    {
      id: "2.3",
      title: "Basic Syntax & Structure",
      content: `
        <h3>Module Definition and Port Declarations</h3>
        <p>Modules are the fundamental building blocks in Verilog. They encapsulate functionality and can be instantiated multiple times in a design.</p>
        
        <h4>Module Structure</h4>
        <p>A basic Verilog module has the following structure:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module module_name(<br>
          &nbsp;&nbsp;// Port declarations<br>
          &nbsp;&nbsp;input wire in1,<br>
          &nbsp;&nbsp;input wire [7:0] in_vector,<br>
          &nbsp;&nbsp;output wire out1,<br>
          &nbsp;&nbsp;output reg [15:0] out_vector,<br>
          &nbsp;&nbsp;inout wire bidirectional<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Internal declarations<br>
          &nbsp;&nbsp;wire internal_connection;<br>
          &nbsp;&nbsp;reg [3:0] internal_register;<br>
          <br>
          &nbsp;&nbsp;// Implementation (assignments, always blocks, etc.)<br>
          &nbsp;&nbsp;assign out1 = in1 & internal_connection;<br>
          <br>
          &nbsp;&nbsp;// More implementation...<br>
          <br>
          endmodule
        </div>
        
        <h4>Port Declarations</h4>
        <p>Ports define the interface of a module, specifying what signals go in and out:</p>
        <ul>
          <li><strong>input</strong>: Data flowing into the module</li>
          <li><strong>output</strong>: Data flowing out of the module</li>
          <li><strong>inout</strong>: Bidirectional data (both in and out)</li>
        </ul>
        
        <p>Ports can be declared in two styles:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // ANSI C-style port declarations (Verilog-2001, preferred)<br>
          module counter(<br>
          &nbsp;&nbsp;input wire clock,<br>
          &nbsp;&nbsp;input wire reset,<br>
          &nbsp;&nbsp;input wire enable,<br>
          &nbsp;&nbsp;output reg [7:0] count<br>
          );<br>
          &nbsp;&nbsp;// Module body...<br>
          endmodule<br>
          <br>
          // Older style (Verilog-1995)<br>
          module counter(clock, reset, enable, count);<br>
          &nbsp;&nbsp;input clock, reset, enable;<br>
          &nbsp;&nbsp;output [7:0] count;<br>
          &nbsp;&nbsp;reg [7:0] count;<br>
          &nbsp;&nbsp;// Module body...<br>
          endmodule
        </div>
        
        <p>The ANSI C-style (Verilog-2001) is more concise and is the recommended approach for new designs.</p>
        
        <h4>Structural Hierarchy</h4>
        <p>Verilog designs typically have a hierarchical structure, with modules instantiating other modules:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module top_module(<br>
          &nbsp;&nbsp;input wire clk,<br>
          &nbsp;&nbsp;input wire rst,<br>
          &nbsp;&nbsp;input wire [7:0] data_in,<br>
          &nbsp;&nbsp;output wire [7:0] data_out<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Internal connections<br>
          &nbsp;&nbsp;wire [7:0] intermediate_data;<br>
          &nbsp;&nbsp;wire valid_signal;<br>
          <br>
          &nbsp;&nbsp;// Instantiate sub-modules<br>
          &nbsp;&nbsp;data_processor processor_inst (<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.clock(clk),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.reset(rst),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.data_in(data_in),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.processed_data(intermediate_data),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.data_valid(valid_signal)<br>
          &nbsp;&nbsp;);<br>
          <br>
          &nbsp;&nbsp;output_controller controller_inst (<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.clock(clk),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.reset(rst),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.data_in(intermediate_data),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.valid_in(valid_signal),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.data_out(data_out)<br>
          &nbsp;&nbsp;);<br>
          <br>
          endmodule
        </div>
        
        <h4>Module Instantiation Styles</h4>
        <p>There are two ways to connect ports when instantiating a module:</p>
        
        <ol>
          <li><strong>Positional port connections</strong>: Connections are made based on the order of ports in the module definition</li>
          <li><strong>Named port connections</strong>: Connections explicitly name which port they connect to</li>
        </ol>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Positional port connections<br>
          counter count1(clock, reset, enable, count_value);<br>
          <br>
          // Named port connections (preferred)<br>
          counter count2(<br>
          &nbsp;&nbsp;.clock(clock),<br>
          &nbsp;&nbsp;.reset(reset),<br>
          &nbsp;&nbsp;.enable(enable),<br>
          &nbsp;&nbsp;.count(count_value)<br>
          );
        </div>
        
        <p>Named port connections are strongly recommended because they:</p>
        <ul>
          <li>Make code more readable and self-documenting</li>
          <li>Allow ports to be connected in any order</li>
          <li>Reduce errors when module port definitions change</li>
          <li>Make it easier to leave optional ports unconnected</li>
        </ul>
      `
    },
    {
      id: "2.4",
      title: "Key Takeaways",
      content: `
        <h3>Summary: Verilog Fundamentals</h3>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #6a0dad; margin: 20px 0;">
          <h4>Key Points</h4>
          <ul>
            <li>Verilog has specific lexical conventions, including rules for identifiers, keywords, and comments.</li>
            <li>Data types in Verilog represent hardware elements: net types for connections and variable types for storage.</li>
            <li>The <code>module</code> is the fundamental building block in Verilog, with input, output, and inout ports defining its interface.</li>
            <li>Verilog designs are typically hierarchical, with modules instantiating other modules.</li>
            <li>Named port connections are preferred over positional connections for clarity and maintainability.</li>
          </ul>
        </div>
        
        <h3>What's Next?</h3>
        <p>Now that you've learned the fundamental building blocks of Verilog, we'll explore different modeling styles in the next chapter. You'll learn about gate-level modeling, dataflow (RTL) modeling, and behavioral modeling—each offering different levels of abstraction for your designs.</p>
        
        <h3>Reflection Questions</h3>
        <ol>
          <li>Why is it important to choose the correct data type (net vs. variable) for signals in your design?</li>
          <li>How does hierarchical design with modules help manage complexity in larger designs?</li>
          <li>Consider a simple digital circuit you're familiar with (e.g., a counter or adder). How would you break it down into modules and connections?</li>
        </ol>
      `
    }
  ],
  quiz: {
    title: "Verilog Language Fundamentals Quiz",
    description: "Test your understanding of Verilog syntax, modules, and data types",
    questions: [
      {
        id: "q2_1",
        question: "Which of the following is NOT a valid identifier in Verilog?",
        options: [
          { id: "a", text: "count_1" },
          { id: "b", text: "_data" },
          { id: "c", text: "2counter" },
          { id: "d", text: "input_value$" }
        ],
        correctAnswer: "c",
        explanation: "Identifiers in Verilog must begin with a letter or underscore, followed by letters, digits, underscores, or dollar signs. '2counter' is invalid because it starts with a digit."
      },
      {
        id: "q2_2",
        question: "Which data type would be appropriate for representing a wire connection between gates?",
        options: [
          { id: "a", text: "reg" },
          { id: "b", text: "wire" },
          { id: "c", text: "integer" },
          { id: "d", text: "time" }
        ],
        correctAnswer: "b",
        explanation: "The 'wire' data type is used to represent physical connections between hardware elements. It cannot store values and must be continuously driven."
      },
      {
        id: "q2_3",
        question: "Which port direction is used for signals that can be both read from and written to by a module?",
        options: [
          { id: "a", text: "input" },
          { id: "b", text: "output" },
          { id: "c", text: "inout" },
          { id: "d", text: "buffer" }
        ],
        correctAnswer: "c",
        explanation: "The 'inout' port direction is used for bidirectional signals that can be both read from and written to by a module, such as tri-state bus connections."
      },
      {
        id: "q2_4",
        question: "Which of the following correctly declares an 8-bit wide bus named 'data'?",
        options: [
          { id: "a", text: "wire data[7:0];" },
          { id: "b", text: "wire [7:0] data;" },
          { id: "c", text: "wire data[0:7];" },
          { id: "d", text: "bus [7:0] data;" }
        ],
        correctAnswer: "b",
        explanation: "The correct syntax for declaring an 8-bit bus is 'wire [7:0] data;'. The notation [7:0] indicates the bus spans from bit 7 (MSB) to bit 0 (LSB)."
      },
      {
        id: "q2_5",
        question: "What is the output of the following line of code: $display(\"%b\", 4'b1010);",
        options: [
          { id: "a", text: "1010" },
          { id: "b", text: "10" },
          { id: "c", text: "0101" },
          { id: "d", text: "4'b1010" }
        ],
        correctAnswer: "a",
        explanation: "The $display system task with the %b format specifier outputs the binary value. In this case, 4'b1010 will be printed as '1010'."
      },
      {
        id: "q2_6",
        question: "Which of the following is the correct way to instantiate a module named 'counter' with parameters?",
        options: [
          { id: "a", text: "counter #(.WIDTH(8), .MAX(255)) c1 (clk, rst, enable, count);" },
          { id: "b", text: "counter c1 (WIDTH=8, MAX=255) (clk, rst, enable, count);" },
          { id: "c", text: "counter c1 (parameters: WIDTH=8, MAX=255) (clk, rst, enable, count);" },
          { id: "d", text: "counter c1 (clk, rst, enable, count) #(WIDTH=8, MAX=255);" }
        ],
        correctAnswer: "a",
        explanation: "The correct syntax for module instantiation with parameters is: module_name #(.PARAM1(value1), .PARAM2(value2)) instance_name (port_connections);"
      },
      {
        id: "q2_7",
        question: "What is the size (in bits) of the following declaration: reg [3:0] memory [0:7];",
        options: [
          { id: "a", text: "4 bits" },
          { id: "b", text: "8 bits" },
          { id: "c", text: "32 bits" },
          { id: "d", text: "11 bits" }
        ],
        correctAnswer: "c",
        explanation: "This declares an array of 8 registers (indexed 0 to 7), each 4 bits wide. The total size is 8 * 4 = 32 bits."
      },
      {
        id: "q2_8",
        question: "What is the difference between these two port connection styles?",
        options: [
          { id: "a", text: "Named connections are more verbose but less error-prone" },
          { id: "b", text: "Positional connections are only allowed for modules with fewer than 8 ports" },
          { id: "c", text: "Named connections allow connecting ports in any order" },
          { id: "d", text: "There is no functional difference, it's just coding style" }
        ],
        correctAnswer: "c",
        explanation: "With named port connections (.port_name(signal)), you can connect ports in any order. With positional connections, the order must match the port declaration order in the module definition."
      }
    ]
  }
};

export default chapter2; 