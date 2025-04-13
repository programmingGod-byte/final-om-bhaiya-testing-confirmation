const chapter5 = {
  id: 5,
  title: "Procedural Blocks and Control Flow",
  description: "Learn how to use procedural blocks and control structures in Verilog",
  estimatedTime: "2 hours",
  completed: false,
  sections: [
    {
      id: "5.1",
      title: "always Blocks",
      content: `
        <h3>Understanding Procedural Blocks</h3>
        <p>Procedural blocks are the primary way to describe sequential behavior in Verilog. The most common procedural block is the <code>always</code> block, which allows you to specify behavior that executes in response to specific events.</p>
        
        <h4>Basic Structure of an always Block</h4>
        <p>An <code>always</code> block has the following general structure:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          always @(sensitivity_list) begin<br>
          &nbsp;&nbsp;// Procedural statements<br>
          end
        </div>
        
        <p>The sensitivity list specifies the events or signals that trigger the execution of the block.</p>
        
        <h4>Types of Sensitivity Lists</h4>
        <p>There are several ways to specify when an <code>always</code> block should execute:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Sensitivity Type</th>
            <th>Syntax</th>
            <th>Description</th>
            <th>Common Use</th>
          </tr>
          <tr>
            <td>Edge-sensitive</td>
            <td><code>@(posedge clock)</code><br><code>@(negedge clock)</code></td>
            <td>Executes on rising or falling edge of the specified signal</td>
            <td>Sequential logic (flip-flops, registers)</td>
          </tr>
          <tr>
            <td>Level-sensitive</td>
            <td><code>@(a or b or c)</code><br><code>@*</code> or <code>@(*)</code></td>
            <td>Executes when any of the listed signals change or any signal in RHS of the block changes</td>
            <td>Combinational logic</td>
          </tr>
          <tr>
            <td>Mixed edge-sensitive</td>
            <td><code>@(posedge clk or posedge rst)</code></td>
            <td>Executes on rising edge of clock or rising edge of reset</td>
            <td>Synchronous logic with asynchronous reset</td>
          </tr>
        </table>
        
        <h4>Examples of always Blocks</h4>
        
        <p><strong>Edge-sensitive (Sequential Logic):</strong></p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // D flip-flop with synchronous reset<br>
          always @(posedge clk) begin<br>
          &nbsp;&nbsp;if (rst)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;q <= 1'b0;<br>
          &nbsp;&nbsp;else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;q <= d;<br>
          end
        </div>
        
        <p><strong>Level-sensitive (Combinational Logic):</strong></p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // 2-to-1 multiplexer<br>
          always @(sel or a or b) begin<br>
          &nbsp;&nbsp;if (sel)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = b;<br>
          &nbsp;&nbsp;else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = a;<br>
          end<br>
          <br>
          // Same multiplexer using automatic sensitivity<br>
          always @(*) begin<br>
          &nbsp;&nbsp;if (sel)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = b;<br>
          &nbsp;&nbsp;else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = a;<br>
          end
        </div>
        
        <p><strong>Mixed edge-sensitive (Sequential with Asynchronous Reset):</strong></p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // D flip-flop with asynchronous reset<br>
          always @(posedge clk or posedge rst) begin<br>
          &nbsp;&nbsp;if (rst)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;q <= 1'b0;<br>
          &nbsp;&nbsp;else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;q <= d;<br>
          end
        </div>
        
        <h4>Common Patterns for always Blocks</h4>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Type of Logic</th>
            <th>Pattern</th>
            <th>Assignment Type</th>
            <th>Variable Type</th>
          </tr>
          <tr>
            <td>Combinational Logic</td>
            <td><code>always @(*)</code></td>
            <td>Blocking (<code>=</code>)</td>
            <td><code>reg</code></td>
          </tr>
          <tr>
            <td>Sequential Logic</td>
            <td><code>always @(posedge clk)</code></td>
            <td>Non-blocking (<code><=</code>)</td>
            <td><code>reg</code></td>
          </tr>
        </table>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Important Rules</h4>
          <ul>
            <li>Variables assigned within an <code>always</code> block must be declared as <code>reg</code> type</li>
            <li>Use blocking assignments (<code>=</code>) for combinational logic</li>
            <li>Use non-blocking assignments (<code><=</code>) for sequential logic</li>
            <li>Mixing blocking and non-blocking assignments in the same <code>always</code> block can lead to confusing behavior</li>
            <li>Make sure the sensitivity list includes all signals read within the block (or use <code>@(*)</code> for auto-sensitivity)</li>
          </ul>
        </div>
        
        <h4>Blocking vs. Non-blocking Assignments</h4>
        <p>Understanding the difference between blocking and non-blocking assignments is crucial:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Blocking (=)</th>
            <th>Non-blocking (<=)</th>
          </tr>
          <tr>
            <td>Executes immediately</td>
            <td>Schedules the assignment for the end of the current time step</td>
          </tr>
          <tr>
            <td>Sequential execution within the block</td>
            <td>Parallel execution</td>
          </tr>
          <tr>
            <td>Later statements can see the effect of earlier assignments</td>
            <td>All RHS expressions evaluated before any LHS updates</td>
          </tr>
          <tr>
            <td>Used for combinational logic</td>
            <td>Used for sequential logic</td>
          </tr>
        </table>
        
        <p><strong>Example showing the difference:</strong></p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // With blocking assignments<br>
          always @(*) begin<br>
          &nbsp;&nbsp;a = b + c; // Executes first<br>
          &nbsp;&nbsp;d = a + 1; // Uses updated value of a<br>
          end<br>
          <br>
          // With non-blocking assignments<br>
          always @(posedge clk) begin<br>
          &nbsp;&nbsp;a <= b + c; // RHS evaluated but a not updated yet<br>
          &nbsp;&nbsp;d <= a + 1; // Uses previous value of a, not the b+c value<br>
          end
        </div>
      `
    },
    {
      id: "5.2",
      title: "if-else, case Statements",
      content: `
        <h3>Conditional Statements in Verilog</h3>
        <p>Conditional statements allow for decision-making in your Verilog code, creating different behaviors based on specified conditions.</p>
        
        <h4>if-else Statement</h4>
        <p>The <code>if-else</code> statement evaluates a condition and executes a block of code depending on whether the condition is true or false.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic if-else structure<br>
          if (condition) begin<br>
          &nbsp;&nbsp;// Statements executed if condition is true<br>
          end<br>
          else begin<br>
          &nbsp;&nbsp;// Statements executed if condition is false<br>
          end<br>
          <br>
          // Example: 2-to-1 multiplexer<br>
          always @(*) begin<br>
          &nbsp;&nbsp;if (sel == 1'b1) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = b;<br>
          &nbsp;&nbsp;end<br>
          &nbsp;&nbsp;else begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = a;<br>
          &nbsp;&nbsp;end<br>
          end
        </div>
        
        <p>Multiple conditions can be checked using <code>else if</code>:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // 4-to-1 multiplexer using if-else if-else<br>
          always @(*) begin<br>
          &nbsp;&nbsp;if (sel == 2'b00) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = a;<br>
          &nbsp;&nbsp;end<br>
          &nbsp;&nbsp;else if (sel == 2'b01) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = b;<br>
          &nbsp;&nbsp;end<br>
          &nbsp;&nbsp;else if (sel == 2'b10) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = c;<br>
          &nbsp;&nbsp;end<br>
          &nbsp;&nbsp;else begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = d;<br>
          &nbsp;&nbsp;end<br>
          end
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Important Note</h4>
          <p>For single-statement blocks, the <code>begin</code>/<code>end</code> keywords are optional but recommended for clarity and easier code maintenance:</p>
          <div style="font-family: monospace; margin-top: 10px;">
            // Without begin/end (allowed but less clear)<br>
            if (sel)<br>
            &nbsp;&nbsp;y = b;<br>
            else<br>
            &nbsp;&nbsp;y = a;<br>
            <br>
            // With begin/end (recommended)<br>
            if (sel) begin<br>
            &nbsp;&nbsp;y = b;<br>
            end<br>
            else begin<br>
            &nbsp;&nbsp;y = a;<br>
            end
          </div>
        </div>
        
        <h4>Nested if Statements</h4>
        <p>An <code>if</code> statement can be nested within another <code>if</code> or <code>else</code> block:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          always @(*) begin<br>
          &nbsp;&nbsp;if (enable) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (sel == 2'b00) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y = a;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;&nbsp;&nbsp;else begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y = b;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;end<br>
          &nbsp;&nbsp;else begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;y = 1'b0; // Default output when disabled<br>
          &nbsp;&nbsp;end<br>
          end
        </div>
        
        <h4>case Statement</h4>
        <p>The <code>case</code> statement provides a cleaner way to handle multiple conditions based on a single expression:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic case structure<br>
          case (expression)<br>
          &nbsp;&nbsp;value1: statement1;<br>
          &nbsp;&nbsp;value2: statement2;<br>
          &nbsp;&nbsp;value3: statement3;<br>
          &nbsp;&nbsp;default: default_statement;<br>
          endcase<br>
          <br>
          // Example: 4-to-1 multiplexer using case<br>
          always @(*) begin<br>
          &nbsp;&nbsp;case (sel)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;2'b00: y = a;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;2'b01: y = b;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;2'b10: y = c;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;2'b11: y = d;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;default: y = 1'bx; // Undefined for unknown sel values<br>
          &nbsp;&nbsp;endcase<br>
          end
        </div>
        
        <p>For multiple statements in a <code>case</code> branch, use <code>begin</code>/<code>end</code>:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          always @(posedge clk or posedge rst) begin<br>
          &nbsp;&nbsp;if (rst) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;state <= IDLE;<br>
          &nbsp;&nbsp;end<br>
          &nbsp;&nbsp;else begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;case (state)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IDLE: begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (start)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state <= ACTIVE;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ACTIVE: begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= count + 1;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (count == MAX)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state <= DONE;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DONE: begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;done_flag <= 1'b1;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state <= IDLE;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default: state <= IDLE;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;endcase<br>
          &nbsp;&nbsp;end<br>
          end
        </div>
        
        <h4>Variants of case Statement</h4>
        <p>Verilog provides special forms of the <code>case</code> statement for different matching behaviors:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Variant</th>
            <th>Description</th>
            <th>Example Use Case</th>
          </tr>
          <tr>
            <td><code>case</code></td>
            <td>Standard exact matching</td>
            <td>Regular state machine or selector</td>
          </tr>
          <tr>
            <td><code>casez</code></td>
            <td>Treats <code>?</code> or <code>z</code> as don't-care bits in comparison</td>
            <td>Priority encoders, where some bits don't matter</td>
          </tr>
          <tr>
            <td><code>casex</code></td>
            <td>Treats <code>?</code>, <code>z</code>, or <code>x</code> as don't-care bits</td>
            <td>Similar to casez but less commonly used</td>
          </tr>
        </table>
        
        <p><strong>Example using casez for a priority encoder:</strong></p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          always @(*) begin<br>
          &nbsp;&nbsp;casez (req)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;4'b1???: grant = 4'b1000; // Highest priority<br>
          &nbsp;&nbsp;&nbsp;&nbsp;4'b01??: grant = 4'b0100;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;4'b001?: grant = 4'b0010;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;4'b0001: grant = 4'b0001; // Lowest priority<br>
          &nbsp;&nbsp;&nbsp;&nbsp;default: grant = 4'b0000; // No requests<br>
          &nbsp;&nbsp;endcase<br>
          end
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Best Practices</h4>
          <ul>
            <li>Always include a <code>default</code> case to handle unexpected values</li>
            <li>Use <code>case</code> rather than multiple <code>if-else</code> statements when checking multiple values of a single expression</li>
            <li>Be careful with <code>casex</code> as it can mask design errors by ignoring <code>x</code> values</li>
            <li>Use <code>casez</code> when you need don't-care conditions</li>
            <li>Ensure all possible cases are covered to avoid unintentional latches in synthesis</li>
          </ul>
        </div>
      `
    },
    {
      id: "5.3",
      title: "Loops and Iteration",
      content: `
        <h3>Iterative Constructs in Verilog</h3>
        <p>Verilog provides several looping constructs that allow for repetitive operations, both for simulation and synthesis.</p>
        
        <h4>for Loop</h4>
        <p>The <code>for</code> loop is the most commonly used loop in Verilog, especially for repetitive operations with a known number of iterations.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic for loop structure<br>
          for (initial_statement; condition; step_statement) begin<br>
          &nbsp;&nbsp;// Loop body<br>
          end<br>
          <br>
          // Example: Shift register initialization<br>
          reg [7:0] shift_reg;<br>
          integer i;<br>
          <br>
          initial begin<br>
          &nbsp;&nbsp;// Initialize all bits to 0<br>
          &nbsp;&nbsp;for (i = 0; i < 8; i = i + 1) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;shift_reg[i] = 1'b0;<br>
          &nbsp;&nbsp;end<br>
          end
        </div>
        
        <p><strong>For loop for bit reversal:</strong></p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module bit_reversal (<br>
          &nbsp;&nbsp;input [7:0] data_in,<br>
          &nbsp;&nbsp;output reg [7:0] data_out<br>
          );<br>
          <br>
          &nbsp;&nbsp;integer i;<br>
          <br>
          &nbsp;&nbsp;always @(*) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;for (i = 0; i < 8; i = i + 1) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data_out[i] = data_in[7-i];<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;end<br>
          endmodule
        </div>
        
        <h4>repeat Loop</h4>
        <p>The <code>repeat</code> loop executes a block of code a specific number of times:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic repeat loop structure<br>
          repeat (count) begin<br>
          &nbsp;&nbsp;// Statements to repeat<br>
          end<br>
          <br>
          // Example: Generate 10 clock cycles<br>
          initial begin<br>
          &nbsp;&nbsp;clk = 0;<br>
          &nbsp;&nbsp;repeat (20) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;#5 clk = ~clk; // Toggle clock every 5 time units<br>
          &nbsp;&nbsp;end<br>
          end
        </div>
        
        <h4>while Loop</h4>
        <p>The <code>while</code> loop executes a block of code as long as a condition is true:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic while loop structure<br>
          while (condition) begin<br>
          &nbsp;&nbsp;// Loop body<br>
          end<br>
          <br>
          // Example: Wait until a signal is asserted<br>
          initial begin<br>
          &nbsp;&nbsp;while (ready == 1'b0) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;@(posedge clk); // Wait for clock edge<br>
          &nbsp;&nbsp;end<br>
          &nbsp;&nbsp;$display("Ready asserted at time %t", $time);<br>
          end
        </div>
        
        <h4>forever Loop</h4>
        <p>The <code>forever</code> loop executes a block of code indefinitely. It's commonly used in testbenches:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic forever loop structure<br>
          forever begin<br>
          &nbsp;&nbsp;// Statements to repeat indefinitely<br>
          end<br>
          <br>
          // Example: Generate a continuous clock<br>
          initial begin<br>
          &nbsp;&nbsp;clk = 0;<br>
          &nbsp;&nbsp;forever begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;#10 clk = ~clk; // Toggle clock every 10 time units<br>
          &nbsp;&nbsp;end<br>
          end
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Important Note</h4>
          <p>The <code>forever</code> loop requires a way to exit, typically:</p>
          <ul>
            <li>Use with <code>$finish</code> or <code>$stop</code> in testbenches</li>
            <li>Include in an <code>initial</code> block, not an <code>always</code> block for synthesis</li>
          </ul>
        </div>
        
        <h4>Loop Control Statements</h4>
        <p>Verilog provides statements to control the flow within loops:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Statement</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
          <tr>
            <td><code>break</code></td>
            <td>Exits the loop immediately</td>
            <td>
              <code>
                for (i = 0; i < 10; i = i + 1) begin<br>
                &nbsp;&nbsp;if (data[i] == 1'b1)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;break; // Exit loop when 1 is found<br>
                end
              </code>
            </td>
          </tr>
          <tr>
            <td><code>continue</code></td>
            <td>Skips the rest of the current iteration</td>
            <td>
              <code>
                for (i = 0; i < 10; i = i + 1) begin<br>
                &nbsp;&nbsp;if (data[i] == 1'bx)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;continue; // Skip unknown values<br>
                &nbsp;&nbsp;process(data[i]);<br>
                end
              </code>
            </td>
          </tr>
        </table>
        
        <h4>Generate Blocks for Structural Replication</h4>
        <p>While not a traditional loop, <code>generate</code> blocks with <code>for</code> loops provide a powerful way to create repetitive hardware structures:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Example: 8-bit ripple carry adder using generate<br>
          module ripple_adder #(<br>
          &nbsp;&nbsp;parameter WIDTH = 8<br>
          )(<br>
          &nbsp;&nbsp;input [WIDTH-1:0] a, b,<br>
          &nbsp;&nbsp;input cin,<br>
          &nbsp;&nbsp;output [WIDTH-1:0] sum,<br>
          &nbsp;&nbsp;output cout<br>
          );<br>
          <br>
          &nbsp;&nbsp;wire [WIDTH:0] carry;<br>
          &nbsp;&nbsp;assign carry[0] = cin;<br>
          &nbsp;&nbsp;assign cout = carry[WIDTH];<br>
          <br>
          &nbsp;&nbsp;genvar i;<br>
          &nbsp;&nbsp;generate<br>
          &nbsp;&nbsp;&nbsp;&nbsp;for (i = 0; i < WIDTH; i = i + 1) begin: adder_loop<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;full_adder fa (<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.a(a[i]),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.b(b[i]),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.cin(carry[i]),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.sum(sum[i]),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.cout(carry[i+1])<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;endgenerate<br>
          endmodule
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Synthesis Considerations</h4>
          <ul>
            <li>For synthesis, loops must have constant bounds that can be determined at compile time</li>
            <li>Use <code>genvar</code> instead of <code>integer</code> for loop counters in <code>generate</code> blocks</li>
            <li>Not all loop constructs are synthesizable; <code>for</code> loops are most commonly supported</li>
            <li><code>while</code> and <code>forever</code> loops are typically only used in simulation</li>
            <li>For hardware generation, prefer <code>generate</code> blocks with <code>for</code> loops</li>
          </ul>
        </div>
      `
    },
    {
      id: "5.4",
      title: "Key Takeaways",
      content: `
        <h3>Summary: Procedural Blocks and Control Flow</h3>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #6a0dad; margin: 20px 0;">
          <h4>Key Points</h4>
          <ul>
            <li>Procedural blocks (<code>always</code> blocks) are the primary way to describe behavioral logic in Verilog.</li>
            <li>The sensitivity list in an <code>always</code> block determines when the block executes (edge-sensitive for sequential logic, level-sensitive for combinational logic).</li>
            <li>Use blocking assignments (<code>=</code>) for combinational logic and non-blocking assignments (<code><=</code>) for sequential logic.</li>
            <li>Control structures like <code>if-else</code> and <code>case</code> enable conditional execution, while loops facilitate repetitive operations.</li>
            <li><code>generate</code> blocks provide a powerful way to create repetitive hardware structures during synthesis.</li>
          </ul>
        </div>
        
        <h3>What's Next?</h3>
        <p>Now that you understand procedural blocks and control flow in Verilog, we'll explore hierarchical design and module instantiation in the next chapter. You'll learn how to create modular designs, reuse components, and build complex systems from simpler building blocks.</p>
        
        <h3>Reflection Questions</h3>
        <ol>
          <li>What are the potential issues with using blocking assignments in a sequential circuit or non-blocking assignments in a combinational circuit?</li>
          <li>How would you design a priority encoder using <code>if-else</code> statements versus using a <code>casez</code> statement? What are the trade-offs?</li>
          <li>How could you use a <code>generate</code> block to create a parameterized barrel shifter with a variable bit width?</li>
        </ol>
      `
    }
  ],
  quiz: {
    title: "Procedural Blocks and Control Flow Quiz",
    description: "Test your understanding of always blocks, blocking vs. non-blocking assignments, and control structures in Verilog",
    questions: [
      {
        id: "q5_1",
        question: "Which sensitivity list is appropriate for modeling a D flip-flop with asynchronous reset?",
        options: [
          { id: "a", text: "@(posedge clk)" },
          { id: "b", text: "@(posedge clk or negedge rst_n)" },
          { id: "c", text: "@(clk or rst_n)" },
          { id: "d", text: "@(*)" }
        ],
        correctAnswer: "b",
        explanation: "A D flip-flop with asynchronous reset should trigger on the positive edge of the clock or the negative edge of an active-low reset (rst_n). This ensures the reset can take effect immediately, regardless of the clock state."
      },
      {
        id: "q5_2",
        question: "What type of assignment should be used in an always block that models combinational logic?",
        options: [
          { id: "a", text: "Blocking (=)" },
          { id: "b", text: "Non-blocking (<=)" },
          { id: "c", text: "Either can be used interchangeably" },
          { id: "d", text: "Neither; use assign statements instead" }
        ],
        correctAnswer: "a",
        explanation: "Blocking assignments (=) are recommended for combinational logic in always blocks. They execute sequentially, which matches the behavior expected in combinational circuits where each statement depends on the result of previous statements."
      },
      {
        id: "q5_3",
        question: "What is the key difference between blocking and non-blocking assignments?",
        options: [
          { id: "a", text: "Blocking assignments use '=' while non-blocking use '<='." },
          { id: "b", text: "Blocking assignments execute immediately, while non-blocking assignments are scheduled and update simultaneously." },
          { id: "c", text: "Blocking can only be used in initial blocks, non-blocking only in always blocks." },
          { id: "d", text: "Blocking assignments can only assign to reg variables, non-blocking can assign to wire variables." }
        ],
        correctAnswer: "b",
        explanation: "The key difference is that blocking assignments (=) execute immediately and sequentially, affecting subsequent statements in the same procedural block. Non-blocking assignments (<=) are scheduled and all updates happen simultaneously at the end of the time step."
      },
      {
        id: "q5_4",
        question: "What will happen if a variable is assigned in multiple always blocks?",
        options: [
          { id: "a", text: "The variable will get the value from the last always block in the code." },
          { id: "b", text: "The simulator will report a compilation error." },
          { id: "c", text: "The variable's value will be unpredictable due to race conditions." },
          { id: "d", text: "The synthesis tool will automatically prioritize the assignments." }
        ],
        correctAnswer: "c",
        explanation: "Assigning to the same variable in multiple always blocks creates a race condition. The final value will be unpredictable because it depends on the order in which the blocks execute, which is not defined in the language specification."
      },
      {
        id: "q5_5",
        question: "What is the proper sensitivity list for an always block implementing combinational logic?",
        options: [
          { id: "a", text: "@(posedge clk)" },
          { id: "b", text: "@(*)" },
          { id: "c", text: "@(a, b, c) // where a, b, c are the inputs" },
          { id: "d", text: "Both B and C are correct" }
        ],
        correctAnswer: "d",
        explanation: "For combinational logic, either @(*) (which automatically includes all signals read within the block) or an explicit list of all inputs @(a, b, c) is correct. Both ensure the block executes whenever any input changes."
      },
      {
        id: "q5_6",
        question: "Which control structure is most appropriate for implementing a state machine in Verilog?",
        options: [
          { id: "a", text: "if-else statements" },
          { id: "b", text: "case statements" },
          { id: "c", text: "while loops" },
          { id: "d", text: "for loops" }
        ],
        correctAnswer: "b",
        explanation: "Case statements are most appropriate for implementing state machines as they clearly show all possible states and transitions. Each case represents a state, and the code within each case defines the outputs and next state logic."
      },
      {
        id: "q5_7",
        question: "What happens in a case statement if none of the cases match and there is no default case?",
        options: [
          { id: "a", text: "The outputs retain their previous values" },
          { id: "b", text: "The outputs become 'x' (unknown)" },
          { id: "c", text: "The simulator generates a runtime error" },
          { id: "d", text: "The synthesis tool will automatically add a default case" }
        ],
        correctAnswer: "a",
        explanation: "If none of the cases match and there is no default case, the outputs maintain their previous values. This is known as 'implicit latching' and can lead to unexpected behavior, which is why including a default case is considered good practice."
      },
      {
        id: "q5_8",
        question: "What is a casez statement used for?",
        options: [
          { id: "a", text: "To handle case statements with zero matches" },
          { id: "b", text: "To treat high-impedance values (z) as don't cares" },
          { id: "c", text: "To compare only non-zero bits in the case expressions" },
          { id: "d", text: "To implement zero-delay case statements" }
        ],
        correctAnswer: "b",
        explanation: "The casez statement treats high-impedance values (z) as don't care conditions. It's commonly used in scenarios where certain bits should be ignored during comparison, such as in priority encoders or pattern matching."
      }
    ]
  }
};

export default chapter5; 