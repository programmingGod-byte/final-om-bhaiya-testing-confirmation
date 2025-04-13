const chapter3 = {
  id: 3,
  title: "Modeling Styles in Verilog",
  description: "Explore the three main modeling approaches in Verilog: gate-level, dataflow, and behavioral modeling",
  estimatedTime: "2 hours",
  completed: false,
  sections: [
    {
      id: "3.1",
      title: "Gate-Level Modeling",
      content: `
        <h3>Primitive Logic Gates</h3>
        <p>Gate-level modeling is the lowest level of abstraction in Verilog, representing individual logic gates directly in your code. This approach mirrors the actual hardware structure of digital circuits.</p>
        
        <h4>Built-in Gate Primitives</h4>
        <p>Verilog includes built-in primitives for common logic gates:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Gate Primitive</th>
            <th>Operation</th>
            <th>Symbol</th>
          </tr>
          <tr>
            <td><code>and</code></td>
            <td>Logical AND</td>
            <td>Y = A & B</td>
          </tr>
          <tr>
            <td><code>or</code></td>
            <td>Logical OR</td>
            <td>Y = A | B</td>
          </tr>
          <tr>
            <td><code>not</code></td>
            <td>Logical NOT</td>
            <td>Y = ~A</td>
          </tr>
          <tr>
            <td><code>nand</code></td>
            <td>Logical NAND</td>
            <td>Y = ~(A & B)</td>
          </tr>
          <tr>
            <td><code>nor</code></td>
            <td>Logical NOR</td>
            <td>Y = ~(A | B)</td>
          </tr>
          <tr>
            <td><code>xor</code></td>
            <td>Logical XOR</td>
            <td>Y = A ^ B</td>
          </tr>
          <tr>
            <td><code>xnor</code></td>
            <td>Logical XNOR</td>
            <td>Y = ~(A ^ B)</td>
          </tr>
          <tr>
            <td><code>buf</code></td>
            <td>Buffer</td>
            <td>Y = A</td>
          </tr>
        </table>
        
        <h4>Gate Instantiation Syntax</h4>
        <p>Gates are instantiated with the following syntax:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          gate_type instance_name(output_port, input_port1, input_port2, ...);
        </div>
        
        <p>Note that for gate primitives, the first port is always the output, followed by inputs.</p>
        
        <h4>Example: Building a Half Adder</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module half_adder_gate(<br>
          &nbsp;&nbsp;input a, b,<br>
          &nbsp;&nbsp;output sum, carry<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Sum is XOR of inputs<br>
          &nbsp;&nbsp;xor xor1(sum, a, b);<br>
          <br>
          &nbsp;&nbsp;// Carry is AND of inputs<br>
          &nbsp;&nbsp;and and1(carry, a, b);<br>
          <br>
          endmodule
        </div>
        
        <h4>Example: Building a Full Adder</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module full_adder_gate(<br>
          &nbsp;&nbsp;input a, b, cin,<br>
          &nbsp;&nbsp;output sum, cout<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Internal connections<br>
          &nbsp;&nbsp;wire s1, c1, c2;<br>
          <br>
          &nbsp;&nbsp;// First half adder<br>
          &nbsp;&nbsp;xor xor1(s1, a, b);<br>
          &nbsp;&nbsp;and and1(c1, a, b);<br>
          <br>
          &nbsp;&nbsp;// Second half adder<br>
          &nbsp;&nbsp;xor xor2(sum, s1, cin);<br>
          &nbsp;&nbsp;and and2(c2, s1, cin);<br>
          <br>
          &nbsp;&nbsp;// Final carry<br>
          &nbsp;&nbsp;or or1(cout, c1, c2);<br>
          <br>
          endmodule
        </div>
        
        <h4>Limitations and Use Cases</h4>
        <p>Gate-level modeling has several important limitations:</p>
        <ul>
          <li>Verbose for complex designs</li>
          <li>Difficult to modify and maintain</li>
          <li>Directly maps to specific technology primitives</li>
          <li>Lacks higher-level abstraction capabilities</li>
        </ul>
        
        <p>However, gate-level modeling is useful in specific scenarios:</p>
        <ul>
          <li>Working with legacy designs</li>
          <li>Implementing small, critical components where fine-grained control is needed</li>
          <li>Educational purposes to understand hardware fundamentals</li>
          <li>Post-synthesis verification when comparing with RTL models</li>
        </ul>
      `
    },
    {
      id: "3.2",
      title: "Dataflow (RTL) Modeling",
      content: `
        <h3>Continuous Assignments with assign</h3>
        <p>Dataflow modeling, also known as Register Transfer Level (RTL) modeling, describes hardware in terms of data flow between registers and the logical operations performed on signals.</p>
        
        <h4>The assign Statement</h4>
        <p>The primary construct in dataflow modeling is the <code>assign</code> statement, which creates a continuous assignment:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          assign output_signal = expression;
        </div>
        
        <p>Key characteristics of the <code>assign</code> statement:</p>
        <ul>
          <li>Creates a continuous connection that is always active</li>
          <li>The right-hand side is re-evaluated whenever any input changes</li>
          <li>Maps directly to combinational logic in hardware</li>
          <li>Cannot be used for sequential logic (registers/flip-flops)</li>
        </ul>
        
        <h4>Example: Half Adder in Dataflow Style</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module half_adder_dataflow(<br>
          &nbsp;&nbsp;input a, b,<br>
          &nbsp;&nbsp;output sum, carry<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Sum is XOR of inputs<br>
          &nbsp;&nbsp;assign sum = a ^ b;<br>
          <br>
          &nbsp;&nbsp;// Carry is AND of inputs<br>
          &nbsp;&nbsp;assign carry = a & b;<br>
          <br>
          endmodule
        </div>
        
        <h4>Example: Full Adder in Dataflow Style</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module full_adder_dataflow(<br>
          &nbsp;&nbsp;input a, b, cin,<br>
          &nbsp;&nbsp;output sum, cout<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Sum is XOR of all three inputs<br>
          &nbsp;&nbsp;assign sum = a ^ b ^ cin;<br>
          <br>
          &nbsp;&nbsp;// Carry out is generated if any two or all inputs are 1<br>
          &nbsp;&nbsp;assign cout = (a & b) | (b & cin) | (a & cin);<br>
          <br>
          endmodule
        </div>
        
        <h4>Operators in Expressions</h4>
        <p>Dataflow modeling uses a rich set of operators to create expressions:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Operator Type</th>
            <th>Operators</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Arithmetic</td>
            <td><code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code></td>
            <td><code>assign sum = a + b;</code></td>
          </tr>
          <tr>
            <td>Logical</td>
            <td><code>&&</code> (AND), <code>||</code> (OR), <code>!</code> (NOT)</td>
            <td><code>assign valid = ready && !busy;</code></td>
          </tr>
          <tr>
            <td>Bitwise</td>
            <td><code>&</code>, <code>|</code>, <code>^</code>, <code>~</code></td>
            <td><code>assign mask = data & 8'hF0;</code></td>
          </tr>
          <tr>
            <td>Reduction</td>
            <td><code>&</code>, <code>|</code>, <code>^</code>, <code>~&</code>, <code>~|</code>, <code>~^</code></td>
            <td><code>assign all_bits = &data;</code></td>
          </tr>
          <tr>
            <td>Shift</td>
            <td><code><<</code>, <code>>></code></td>
            <td><code>assign shifted = value << 2;</code></td>
          </tr>
          <tr>
            <td>Conditional</td>
            <td><code>?:</code></td>
            <td><code>assign out = sel ? a : b;</code></td>
          </tr>
        </table>
        
        <h4>Example: 4-to-1 Multiplexer</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module mux_4to1(<br>
          &nbsp;&nbsp;input [1:0] sel,<br>
          &nbsp;&nbsp;input [7:0] a, b, c, d,<br>
          &nbsp;&nbsp;output [7:0] out<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Using conditional operator<br>
          &nbsp;&nbsp;assign out = (sel == 2'b00) ? a :<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(sel == 2'b01) ? b :<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(sel == 2'b10) ? c : d;<br>
          <br>
          endmodule
        </div>
        
        <h4>Advantages of Dataflow Modeling</h4>
        <ul>
          <li>More concise and readable than gate-level modeling</li>
          <li>Directly expresses the designer's intent</li>
          <li>Easier to modify and maintain</li>
          <li>Synthesizes to optimized logic</li>
          <li>Hardware-independent (synthesizer determines optimal gates)</li>
        </ul>
        
        <p>Dataflow modeling is the preferred style for most combinational logic in modern FPGA and ASIC designs.</p>
      `
    },
    {
      id: "3.3",
      title: "Behavioral Modeling",
      content: `
        <h3>always Blocks, Procedural Statements</h3>
        <p>Behavioral modeling is the highest level of abstraction in Verilog, describing what the circuit does rather than how it's implemented. This allows for complex algorithms and state machines to be expressed concisely.</p>
        
        <h4>The always Block</h4>
        <p>The primary construct in behavioral modeling is the <code>always</code> block:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          always @(sensitivity_list) begin<br>
          &nbsp;&nbsp;// Procedural statements<br>
          end
        </div>
        
        <p>The sensitivity list determines when the block executes:</p>
        <ul>
          <li><code>always @(posedge clk)</code> - Executes on rising edge of clock (sequential logic)</li>
          <li><code>always @(negedge clk)</code> - Executes on falling edge of clock (sequential logic)</li>
          <li><code>always @(a or b or c)</code> - Executes when any signal changes (combinational logic)</li>
          <li><code>always @*</code> - Executes when any signal on the right side of assignments changes (Verilog-2001 shorthand for combinational logic)</li>
        </ul>
        
        <h4>Blocking vs. Non-blocking Assignments</h4>
        <p>Behavioral modeling uses two types of assignments:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Assignment Type</th>
            <th>Syntax</th>
            <th>Execution</th>
            <th>Typical Use</th>
          </tr>
          <tr>
            <td>Blocking</td>
            <td><code>a = b;</code></td>
            <td>Immediate, sequential execution</td>
            <td>Combinational logic</td>
          </tr>
          <tr>
            <td>Non-blocking</td>
            <td><code>a <= b;</code></td>
            <td>All right sides evaluate first, then all assignments happen simultaneously</td>
            <td>Sequential logic (flip-flops)</td>
          </tr>
        </table>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Important Guideline</h4>
          <p>A good rule of thumb for synthesizable code:</p>
          <ul>
            <li>Use blocking assignments (<code>=</code>) in combinational <code>always</code> blocks</li>
            <li>Use non-blocking assignments (<code><=</code>) in sequential <code>always</code> blocks</li>
          </ul>
          <p>Mixing assignment types in the same always block often leads to simulation-synthesis mismatches.</p>
        </div>
        
        <h4>Example: Combinational Logic (Multiplexer)</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module mux_4to1_behavioral(<br>
          &nbsp;&nbsp;input [1:0] sel,<br>
          &nbsp;&nbsp;input [7:0] a, b, c, d,<br>
          &nbsp;&nbsp;output reg [7:0] out<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Combinational logic with blocking assignments<br>
          &nbsp;&nbsp;always @* begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;case(sel)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2'b00: out = a;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2'b01: out = b;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2'b10: out = c;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2'b11: out = d;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default: out = 8'h00; // Good practice to include default<br>
          &nbsp;&nbsp;&nbsp;&nbsp;endcase<br>
          &nbsp;&nbsp;end<br>
          <br>
          endmodule
        </div>
        
        <h4>Example: Sequential Logic (D Flip-Flop)</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module d_ff(<br>
          &nbsp;&nbsp;input clk, reset,<br>
          &nbsp;&nbsp;input [7:0] d,<br>
          &nbsp;&nbsp;output reg [7:0] q<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Sequential logic with non-blocking assignments<br>
          &nbsp;&nbsp;always @(posedge clk or posedge reset) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (reset)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;q <= 8'h00; // Reset to zero<br>
          &nbsp;&nbsp;&nbsp;&nbsp;else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;q <= d; // Store input value<br>
          &nbsp;&nbsp;end<br>
          <br>
          endmodule
        </div>
        
        <h4>Control Flow Statements</h4>
        <p>Behavioral modeling supports standard control flow statements:</p>
        <ul>
          <li><code>if-else</code> - Conditional execution</li>
          <li><code>case</code> - Multi-way branching</li>
          <li><code>for</code>, <code>while</code>, <code>repeat</code> - Loops (mostly for testbenches, use with care in synthesizable code)</li>
        </ul>
        
        <h4>Example: Up/Down Counter</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module counter(<br>
          &nbsp;&nbsp;input clk, reset, up_down,<br>
          &nbsp;&nbsp;output reg [7:0] count<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Sequential counter with direction control<br>
          &nbsp;&nbsp;always @(posedge clk or posedge reset) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (reset)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= 8'h00;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;else begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (up_down) // Count up when up_down is 1<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= count + 1;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else // Count down when up_down is 0<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= count - 1;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;end<br>
          <br>
          endmodule
        </div>
        
        <h4>Synthesizable Behavioral Code Guidelines</h4>
        <p>Not all behavioral code is synthesizable. Follow these guidelines:</p>
        <ul>
          <li>Always specify a complete sensitivity list (or use <code>@*</code>)</li>
          <li>Ensure every possible condition is covered to avoid latches</li>
          <li>Use blocking assignments for combinational logic</li>
          <li>Use non-blocking assignments for sequential logic</li>
          <li>Avoid time delays and level-sensitive triggers in synthesizable code</li>
          <li>Use for loops only with constant bounds for synthesis</li>
        </ul>
      `
    },
    {
      id: "3.4",
      title: "Key Takeaways",
      content: `
        <h3>Summary: Modeling Styles in Verilog</h3>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #6a0dad; margin: 20px 0;">
          <h4>Key Points</h4>
          <ul>
            <li>Verilog offers three main modeling styles, each with different levels of abstraction and use cases.</li>
            <li>Gate-level modeling uses primitive gates directly, offering low-level control but verbose for complex designs.</li>
            <li>Dataflow modeling with <code>assign</code> statements provides a clear representation of combinational logic.</li>
            <li>Behavioral modeling with <code>always</code> blocks offers the highest abstraction and flexibility for both combinational and sequential logic.</li>
            <li>Use the right modeling style for each part of your design based on requirements and maintainability needs.</li>
          </ul>
        </div>
        
        <h3>Comparison of Modeling Styles</h3>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Feature</th>
            <th>Gate-Level</th>
            <th>Dataflow (RTL)</th>
            <th>Behavioral</th>
          </tr>
          <tr>
            <td>Abstraction Level</td>
            <td>Low</td>
            <td>Medium</td>
            <td>High</td>
          </tr>
          <tr>
            <td>Typical Constructs</td>
            <td>Primitive gates</td>
            <td><code>assign</code> statements</td>
            <td><code>always</code> blocks</td>
          </tr>
          <tr>
            <td>Code Conciseness</td>
            <td>Verbose</td>
            <td>Moderate</td>
            <td>Concise</td>
          </tr>
          <tr>
            <td>Combinational Logic</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Sequential Logic</td>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Best For</td>
            <td>Small, critical circuits</td>
            <td>Most combinational logic</td>
            <td>Complex logic, state machines</td>
          </tr>
        </table>
        
        <h3>What's Next?</h3>
        <p>With an understanding of the different modeling styles in Verilog, you're now ready to dive deeper into the operators and expressions that form the building blocks of these models. In the next chapter, we'll explore Verilog's rich set of operators and expressions, data types in more detail, and how to use them effectively in your designs.</p>
        
        <h3>Reflection Questions</h3>
        <ol>
          <li>For a simple arithmetic circuit, which modeling style would you choose, and why?</li>
          <li>How do blocking and non-blocking assignments differ in their execution, and why is this important when modeling hardware?</li>
          <li>Consider a traffic light controller. Which parts might be best modeled using behavioral style, and which might use dataflow?</li>
        </ol>
      `
    }
  ],
  quiz: {
    title: "Modeling Styles in Verilog Quiz",
    description: "Test your understanding of gate-level, dataflow, and behavioral modeling in Verilog",
    questions: [
      {
        id: "q3_1",
        question: "Which modeling style typically uses the 'assign' statement?",
        options: [
          { id: "a", text: "Gate-level modeling" },
          { id: "b", text: "Dataflow modeling" },
          { id: "c", text: "Behavioral modeling" },
          { id: "d", text: "Structural modeling" }
        ],
        correctAnswer: "b",
        explanation: "Dataflow modeling typically uses the 'assign' statement to create continuous assignments that represent combinational logic."
      },
      {
        id: "q3_2",
        question: "In gate-level modeling, what is the correct way to instantiate an AND gate?",
        options: [
          { id: "a", text: "and #(delay) instance_name(output, input1, input2);" },
          { id: "b", text: "and instance_name(input1, input2, output);" },
          { id: "c", text: "AND(input1, input2, output);" },
          { id: "d", text: "gate and(input1 & input2, output);" }
        ],
        correctAnswer: "a",
        explanation: "For gate primitives, the first port is always the output, followed by inputs. The correct syntax is: and [instance_name] (output, input1, input2, ...);"
      },
      {
        id: "q3_3",
        question: "Which modeling style provides the highest level of abstraction?",
        options: [
          { id: "a", text: "Gate-level modeling" },
          { id: "b", text: "Dataflow modeling" },
          { id: "c", text: "Behavioral modeling" },
          { id: "d", text: "Switch-level modeling" }
        ],
        correctAnswer: "c",
        explanation: "Behavioral modeling provides the highest level of abstraction, allowing you to describe what the circuit does without specifying how it's implemented. It uses procedural blocks like 'always' and 'initial'."
      },
      {
        id: "q3_4",
        question: "What is the main drawback of gate-level modeling?",
        options: [
          { id: "a", text: "It consumes more simulation resources" },
          { id: "b", text: "It is not supported by all simulators" },
          { id: "c", text: "It is verbose and difficult to modify for complex designs" },
          { id: "d", text: "It cannot be synthesized to hardware" }
        ],
        correctAnswer: "c",
        explanation: "Gate-level modeling becomes extremely verbose for complex designs, making it difficult to write, read, and maintain. It directly maps to gates, which requires many lines of code even for simple functions."
      },
      {
        id: "q3_5",
        question: "In the following code, which modeling style is being used? \nassign sum = a ^ b ^ cin; \nassign cout = (a & b) | (b & cin) | (a & cin);",
        options: [
          { id: "a", text: "Gate-level modeling" },
          { id: "b", text: "Dataflow modeling" },
          { id: "c", text: "Behavioral modeling" },
          { id: "d", text: "Mixed modeling" }
        ],
        correctAnswer: "b",
        explanation: "This is dataflow modeling, characterized by the use of 'assign' statements and expressions. It describes the relationships between signals using operators rather than explicit gates or procedural code."
      },
      {
        id: "q3_6",
        question: "Which of the following operators can be used in dataflow modeling but NOT in gate-level modeling?",
        options: [
          { id: "a", text: "Logical AND (&)" },
          { id: "b", text: "Logical OR (|)" },
          { id: "c", text: "Conditional operator (?:)" },
          { id: "d", text: "Logical XOR (^)" }
        ],
        correctAnswer: "c",
        explanation: "The conditional operator (?:) can be used in dataflow modeling with assign statements, but has no direct equivalent in gate-level modeling using primitive gates. The other operators have direct gate equivalents."
      },
      {
        id: "q3_7",
        question: "In behavioral modeling, which construct is used to describe a 4-to-1 multiplexer?",
        options: [
          { id: "a", text: "assign statements with conditional operators" },
          { id: "b", text: "Multiple instantiations of 2-to-1 multiplexers" },
          { id: "c", text: "case statement inside an always block" },
          { id: "d", text: "function declaration with a return statement" }
        ],
        correctAnswer: "c",
        explanation: "In behavioral modeling, a 4-to-1 multiplexer would typically be implemented using a case statement inside an always block, selecting the output based on the select lines."
      },
      {
        id: "q3_8",
        question: "Which modeling style is most appropriate for a testbench?",
        options: [
          { id: "a", text: "Gate-level modeling" },
          { id: "b", text: "Dataflow modeling" },
          { id: "c", text: "Behavioral modeling" },
          { id: "d", text: "Mixed modeling" }
        ],
        correctAnswer: "c",
        explanation: "Behavioral modeling is most appropriate for testbenches because it allows for high-level abstractions, sequential execution of test scenarios, and use of non-synthesizable constructs like 'initial' blocks, delays, and system tasks for verification."
      }
    ]
  }
};

export default chapter3; 