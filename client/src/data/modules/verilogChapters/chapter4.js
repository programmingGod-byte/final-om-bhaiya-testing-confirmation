const chapter4 = {
  id: 4,
  title: "Operators, Expressions, and Data Types in Depth",
  description: "Master Verilog's operators, expressions, and advanced data type usage",
  estimatedTime: "2 hours",
  completed: false,
  sections: [
    {
      id: "4.1",
      title: "Operators",
      content: `
        <h3>Arithmetic Operators</h3>
        <p>Verilog provides a rich set of operators for manipulating data. Understanding these operators is essential for writing effective and efficient code.</p>
        
        <h4>Arithmetic Operators</h4>
        <p>These operators perform mathematical calculations:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Operator</th>
            <th>Description</th>
            <th>Example</th>
            <th>Notes</th>
          </tr>
          <tr>
            <td><code>+</code></td>
            <td>Addition</td>
            <td><code>a = b + c;</code></td>
            <td>Wraps around on overflow</td>
          </tr>
          <tr>
            <td><code>-</code></td>
            <td>Subtraction</td>
            <td><code>a = b - c;</code></td>
            <td>Wraps around on underflow</td>
          </tr>
          <tr>
            <td><code>*</code></td>
            <td>Multiplication</td>
            <td><code>a = b * c;</code></td>
            <td>Result width is the sum of operand widths</td>
          </tr>
          <tr>
            <td><code>/</code></td>
            <td>Division</td>
            <td><code>a = b / c;</code></td>
            <td>Integer division (truncates fractional part)</td>
          </tr>
          <tr>
            <td><code>%</code></td>
            <td>Modulo</td>
            <td><code>a = b % c;</code></td>
            <td>Remainder after division</td>
          </tr>
          <tr>
            <td><code>**</code></td>
            <td>Exponentiation</td>
            <td><code>a = 2 ** 3;</code> (8)</td>
            <td>Exponent must be a constant</td>
          </tr>
        </table>
        
        <p>Example of arithmetic operations:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module arithmetic_example;<br>
          &nbsp;&nbsp;reg [7:0] a, b, c, d, e, f;<br>
          <br>
          &nbsp;&nbsp;initial begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;a = 8'd10;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;b = 8'd3;<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;c = a + b; // c = 13<br>
          &nbsp;&nbsp;&nbsp;&nbsp;d = a - b; // d = 7<br>
          &nbsp;&nbsp;&nbsp;&nbsp;e = a * b; // e = 30<br>
          &nbsp;&nbsp;&nbsp;&nbsp;f = a / b; // f = 3 (integer division)<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("a = %d, b = %d", a, b);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("a + b = %d", c);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("a - b = %d", d);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("a * b = %d", e);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("a / b = %d", f);<br>
          &nbsp;&nbsp;end<br>
          endmodule
        </div>
        
        <h4>Logical and Relational Operators</h4>
        <p>These operators perform comparisons and logical operations:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Operator</th>
            <th>Description</th>
            <th>Example</th>
            <th>Result</th>
          </tr>
          <tr>
            <td><code>==</code></td>
            <td>Equality</td>
            <td><code>a == b</code></td>
            <td>1 if equal, 0 if not</td>
          </tr>
          <tr>
            <td><code>!=</code></td>
            <td>Inequality</td>
            <td><code>a != b</code></td>
            <td>1 if not equal, 0 if equal</td>
          </tr>
          <tr>
            <td><code><</code></td>
            <td>Less than</td>
            <td><code>a < b</code></td>
            <td>1 if a less than b, 0 otherwise</td>
          </tr>
          <tr>
            <td><code>></code></td>
            <td>Greater than</td>
            <td><code>a > b</code></td>
            <td>1 if a greater than b, 0 otherwise</td>
          </tr>
          <tr>
            <td><code><=</code></td>
            <td>Less than or equal</td>
            <td><code>a <= b</code></td>
            <td>1 if a less than or equal to b, 0 otherwise</td>
          </tr>
          <tr>
            <td><code>>=</code></td>
            <td>Greater than or equal</td>
            <td><code>a >= b</code></td>
            <td>1 if a greater than or equal to b, 0 otherwise</td>
          </tr>
          <tr>
            <td><code>&&</code></td>
            <td>Logical AND</td>
            <td><code>a && b</code></td>
            <td>1 if both a and b are nonzero, 0 otherwise</td>
          </tr>
          <tr>
            <td><code>||</code></td>
            <td>Logical OR</td>
            <td><code>a || b</code></td>
            <td>1 if either a or b is nonzero, 0 otherwise</td>
          </tr>
          <tr>
            <td><code>!</code></td>
            <td>Logical NOT</td>
            <td><code>!a</code></td>
            <td>1 if a is zero, 0 otherwise</td>
          </tr>
        </table>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Important Note</h4>
          <p>Don't confuse logical operators (<code>&&</code>, <code>||</code>, <code>!</code>) with bitwise operators (<code>&</code>, <code>|</code>, <code>~</code>):</p>
          <ul>
            <li>Logical operators work on expressions as a whole and produce a 1-bit result</li>
            <li>Bitwise operators work on each bit position independently</li>
          </ul>
        </div>
        
        <h4>Bitwise Operators</h4>
        <p>These operators perform bit-by-bit operations:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Operator</th>
            <th>Description</th>
            <th>Example</th>
            <th>Example Result</th>
          </tr>
          <tr>
            <td><code>&</code></td>
            <td>Bitwise AND</td>
            <td><code>8'b1010_1100 & 8'b0011_1101</code></td>
            <td><code>8'b0010_1100</code></td>
          </tr>
          <tr>
            <td><code>|</code></td>
            <td>Bitwise OR</td>
            <td><code>8'b1010_1100 | 8'b0011_1101</code></td>
            <td><code>8'b1011_1101</code></td>
          </tr>
          <tr>
            <td><code>^</code></td>
            <td>Bitwise XOR</td>
            <td><code>8'b1010_1100 ^ 8'b0011_1101</code></td>
            <td><code>8'b1001_0001</code></td>
          </tr>
          <tr>
            <td><code>~</code></td>
            <td>Bitwise NOT</td>
            <td><code>~8'b1010_1100</code></td>
            <td><code>8'b0101_0011</code></td>
          </tr>
        </table>
        
        <h4>Reduction Operators</h4>
        <p>These operators reduce a multi-bit value to a single bit:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Operator</th>
            <th>Description</th>
            <th>Example</th>
            <th>Equivalent To</th>
          </tr>
          <tr>
            <td><code>&</code></td>
            <td>AND reduction</td>
            <td><code>&4'b1111</code> = 1</td>
            <td>All bits are 1</td>
          </tr>
          <tr>
            <td><code>|</code></td>
            <td>OR reduction</td>
            <td><code>|4'b0001</code> = 1</td>
            <td>Any bit is 1</td>
          </tr>
          <tr>
            <td><code>^</code></td>
            <td>XOR reduction</td>
            <td><code>^4'b1010</code> = 0</td>
            <td>Odd number of 1s?</td>
          </tr>
          <tr>
            <td><code>~&</code></td>
            <td>NAND reduction</td>
            <td><code>~&4'b1111</code> = 0</td>
            <td>Not all bits are 1</td>
          </tr>
          <tr>
            <td><code>~|</code></td>
            <td>NOR reduction</td>
            <td><code>~|4'b0000</code> = 1</td>
            <td>No bits are 1</td>
          </tr>
          <tr>
            <td><code>~^</code> or <code>^~</code></td>
            <td>XNOR reduction</td>
            <td><code>~^4'b1010</code> = 1</td>
            <td>Even number of 1s?</td>
          </tr>
        </table>
        
        <p>Reduction operators are particularly useful for parity checking and for determining if any/all bits meet a condition.</p>
        
        <h4>Shift Operators</h4>
        <p>These operators shift bits left or right:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Operator</th>
            <th>Description</th>
            <th>Example</th>
            <th>Example Result</th>
          </tr>
          <tr>
            <td><code><<</code></td>
            <td>Left shift</td>
            <td><code>8'b00001111 << 2</code></td>
            <td><code>8'b00111100</code></td>
          </tr>
          <tr>
            <td><code>>></code></td>
            <td>Right shift</td>
            <td><code>8'b11110000 >> 2</code></td>
            <td><code>8'b00111100</code></td>
          </tr>
        </table>
        
        <p>Shift operations:</p>
        <ul>
          <li>Left shift (<code><<</code>) shifts bits to the left, filling with 0s on the right</li>
          <li>Right shift (<code>>></code>) behavior depends on whether the value is signed:
            <ul>
              <li>For unsigned values, it shifts right and fills with 0s on the left</li>
              <li>For signed values, it performs an arithmetic shift, preserving the sign bit</li>
            </ul>
          </li>
        </ul>
        
        <h4>Concatenation and Replication</h4>
        <p>These operators combine signals or replicate bit patterns:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Operator</th>
            <th>Description</th>
            <th>Example</th>
            <th>Result</th>
          </tr>
          <tr>
            <td><code>{}</code></td>
            <td>Concatenation</td>
            <td><code>{4'b1010, 4'b0101}</code></td>
            <td><code>8'b10100101</code></td>
          </tr>
          <tr>
            <td><code>{{n{}}}</code></td>
            <td>Replication</td>
            <td><code>{3{2'b01}}</code></td>
            <td><code>6'b010101</code></td>
          </tr>
        </table>
        
        <p>Example of concatenation and replication:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module concat_example;<br>
          &nbsp;&nbsp;reg [3:0] a, b;<br>
          &nbsp;&nbsp;reg [7:0] c;<br>
          &nbsp;&nbsp;reg [11:0] d;<br>
          <br>
          &nbsp;&nbsp;initial begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;a = 4'b1010;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;b = 4'b0011;<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Concatenation<br>
          &nbsp;&nbsp;&nbsp;&nbsp;c = {a, b}; // c = 8'b10100011<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Replication<br>
          &nbsp;&nbsp;&nbsp;&nbsp;d = {3{4'b1001}}; // d = 12'b100110011001<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("a = %b, b = %b", a, b);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("Concatenation {a, b} = %b", c);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("Replication {3{4'b1001}} = %b", d);<br>
          &nbsp;&nbsp;end<br>
          endmodule
        </div>
      `
    },
    {
      id: "4.2",
      title: "Signed vs. Unsigned",
      content: `
        <h3>Effects on Arithmetic Operations</h3>
        <p>Understanding the difference between signed and unsigned values is crucial for correct arithmetic operations in Verilog.</p>
        
        <h4>Declaring Signed Values</h4>
        <p>By default, all Verilog nets and variables are unsigned. To work with signed values, use the <code>signed</code> keyword:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Unsigned (default)<br>
          reg [7:0] unsigned_value; // Range: 0 to 255<br>
          <br>
          // Signed<br>
          reg signed [7:0] signed_value; // Range: -128 to 127
        </div>
        
        <h4>How Signed Values are Represented</h4>
        <p>Verilog uses two's complement representation for signed values:</p>
        <ul>
          <li>The most significant bit (MSB) serves as the sign bit</li>
          <li>A 0 in the sign bit indicates a positive number</li>
          <li>A 1 in the sign bit indicates a negative number</li>
        </ul>
        
        <p>For example, in an 8-bit signed value:</p>
        <ul>
          <li><code>8'b00000101</code> = +5 (positive, sign bit is 0)</li>
          <li><code>8'b11111011</code> = -5 (negative, sign bit is 1)</li>
        </ul>
        
        <h4>Impact on Arithmetic Operations</h4>
        <p>The signed keyword affects how operators interpret and process values:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Operation</th>
            <th>Unsigned Behavior</th>
            <th>Signed Behavior</th>
          </tr>
          <tr>
            <td>Addition <code>+</code></td>
            <td>Standard binary addition</td>
            <td>Two's complement addition</td>
          </tr>
          <tr>
            <td>Subtraction <code>-</code></td>
            <td>Standard binary subtraction</td>
            <td>Two's complement subtraction</td>
          </tr>
          <tr>
            <td>Multiplication <code>*</code></td>
            <td>Unsigned multiplication</td>
            <td>Signed multiplication</td>
          </tr>
          <tr>
            <td>Division <code>/</code></td>
            <td>Unsigned division</td>
            <td>Signed division</td>
          </tr>
          <tr>
            <td>Comparison <code><</code>, <code>></code></td>
            <td>Compares as magnitudes</td>
            <td>Considers sign bit</td>
          </tr>
          <tr>
            <td>Right shift <code>>></code></td>
            <td>Logical shift (zeros fill)</td>
            <td>Arithmetic shift (sign bit extends)</td>
          </tr>
        </table>
        
        <p>Example showing the difference:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module signed_example;<br>
          &nbsp;&nbsp;reg [7:0] a, b, c;<br>
          &nbsp;&nbsp;reg signed [7:0] d, e, f;<br>
          <br>
          &nbsp;&nbsp;initial begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Unsigned comparison<br>
          &nbsp;&nbsp;&nbsp;&nbsp;a = 8'h80; // 128<br>
          &nbsp;&nbsp;&nbsp;&nbsp;b = 8'h01; // 1<br>
          &nbsp;&nbsp;&nbsp;&nbsp;c = a > b; // c = 1 (128 > 1)<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Signed comparison<br>
          &nbsp;&nbsp;&nbsp;&nbsp;d = 8'h80; // -128 in signed representation<br>
          &nbsp;&nbsp;&nbsp;&nbsp;e = 8'h01; // 1 in signed representation<br>
          &nbsp;&nbsp;&nbsp;&nbsp;f = d > e; // f = 0 (-128 < 1)<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("Unsigned: a = %d, b = %d, a > b = %b", a, b, c);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("Signed: d = %d, e = %d, d > e = %b", d, e, f);<br>
          &nbsp;&nbsp;end<br>
          endmodule
        </div>
        
        <h4>Signed Right Shift Example</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module shift_example;<br>
          &nbsp;&nbsp;reg [7:0] a, b;<br>
          &nbsp;&nbsp;reg signed [7:0] c, d;<br>
          <br>
          &nbsp;&nbsp;initial begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Unsigned right shift<br>
          &nbsp;&nbsp;&nbsp;&nbsp;a = 8'b10000000; // 128<br>
          &nbsp;&nbsp;&nbsp;&nbsp;b = a >> 1; // b = 8'b01000000 (64)<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;// Signed right shift<br>
          &nbsp;&nbsp;&nbsp;&nbsp;c = 8'b10000000; // -128 in signed<br>
          &nbsp;&nbsp;&nbsp;&nbsp;d = c >> 1; // d = 8'b11000000 (-64)<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("Unsigned: a = %b (%d), a >> 1 = %b (%d)", a, a, b, b);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;$display("Signed: c = %b (%d), c >> 1 = %b (%d)", c, c, d, d);<br>
          &nbsp;&nbsp;end<br>
          endmodule
        </div>
        
        <h4>Type Casting</h4>
        <p>You can explicitly convert between signed and unsigned values:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          reg [7:0] unsigned_value;<br>
          reg signed [7:0] signed_value;<br>
          <br>
          // Casting unsigned to signed<br>
          signed_value = $signed(unsigned_value);<br>
          <br>
          // Casting signed to unsigned<br>
          unsigned_value = $unsigned(signed_value);
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Common Gotchas</h4>
          <ul>
            <li>Mixed expressions: If an operation involves both signed and unsigned operands, the unsigned operand is converted to signed</li>
            <li>Context matters: The same bit pattern can be interpreted differently depending on whether it's declared as signed or unsigned</li>
            <li>Bit width mismatches: When combining operands of different widths, the narrower operand is zero-extended (unsigned) or sign-extended (signed)</li>
          </ul>
        </div>
      `
    },
    {
      id: "4.3",
      title: "Constants and Parameters",
      content: `
        <h3>Defining and Using Constants</h3>
        <p>Constants and parameters allow you to define fixed values in your design, making code more readable, maintainable, and configurable.</p>
        
        <h4>Numeric Constants</h4>
        <p>Verilog supports several formats for specifying numeric constants:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Format</th>
            <th>Syntax</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>Decimal</td>
            <td><code>[size]'d[value]</code></td>
            <td><code>8'd42</code></td>
            <td>Decimal format (base 10)</td>
          </tr>
          <tr>
            <td>Hexadecimal</td>
            <td><code>[size]'h[value]</code></td>
            <td><code>8'h2A</code></td>
            <td>Hex format (base 16)</td>
          </tr>
          <tr>
            <td>Binary</td>
            <td><code>[size]'b[value]</code></td>
            <td><code>8'b00101010</code></td>
            <td>Binary format (base 2)</td>
          </tr>
          <tr>
            <td>Octal</td>
            <td><code>[size]'o[value]</code></td>
            <td><code>8'o52</code></td>
            <td>Octal format (base 8)</td>
          </tr>
        </table>
        
        <p>The size specifier is optional but recommended for clarity:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // With size specifier (recommended)<br>
          wire [7:0] a = 8'hFF;<br>
          <br>
          // Without size specifier (will be at least 32 bits)<br>
          wire [7:0] b = 'hFF; // Implicitly sized<br>
          <br>
          // Underscore for readability<br>
          wire [31:0] c = 32'h1234_5678;
        </div>
        
        <h4>The parameter Keyword</h4>
        <p>The <code>parameter</code> keyword defines constants within a module:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module counter #(<br>
          &nbsp;&nbsp;parameter WIDTH = 8,<br>
          &nbsp;&nbsp;parameter MAX_COUNT = 255<br>
          )(<br>
          &nbsp;&nbsp;input clk, reset,<br>
          &nbsp;&nbsp;output reg [WIDTH-1:0] count<br>
          );<br>
          <br>
          &nbsp;&nbsp;always @(posedge clk or posedge reset) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (reset)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= {WIDTH{1'b0}};<br>
          &nbsp;&nbsp;&nbsp;&nbsp;else if (count == MAX_COUNT)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= {WIDTH{1'b0}};<br>
          &nbsp;&nbsp;&nbsp;&nbsp;else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= count + 1'b1;<br>
          &nbsp;&nbsp;end<br>
          endmodule
        </div>
        
        <p>Benefits of parameters:</p>
        <ul>
          <li>Improve code readability by giving meaningful names to constants</li>
          <li>Enable parameterized design, making modules reusable for different specifications</li>
          <li>Centralize constants, making changes easier and less error-prone</li>
          <li>Allow module instantiations with different parameter values</li>
        </ul>
        
        <h4>Parameter Overrides During Instantiation</h4>
        <p>Parameters can be overridden when instantiating a module:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Method 1: Named parameter assignment (Verilog-2001, preferred)<br>
          counter #(<br>
          &nbsp;&nbsp;.WIDTH(16),<br>
          &nbsp;&nbsp;.MAX_COUNT(65535)<br>
          ) counter_inst (<br>
          &nbsp;&nbsp;.clk(clk),<br>
          &nbsp;&nbsp;.reset(reset),<br>
          &nbsp;&nbsp;.count(count)<br>
          );<br>
          <br>
          // Method 2: Positional parameter assignment<br>
          counter #(16, 65535) counter_inst (<br>
          &nbsp;&nbsp;.clk(clk),<br>
          &nbsp;&nbsp;.reset(reset),<br>
          &nbsp;&nbsp;.count(count)<br>
          );<br>
          <br>
          // Using default parameters (no override)<br>
          counter counter_inst (<br>
          &nbsp;&nbsp;.clk(clk),<br>
          &nbsp;&nbsp;.reset(reset),<br>
          &nbsp;&nbsp;.count(count)<br>
          );
        </div>
        
        <h4>The localparam Keyword</h4>
        <p>The <code>localparam</code> keyword defines constants that cannot be overridden during instantiation:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module state_machine (<br>
          &nbsp;&nbsp;input clk, reset,<br>
          &nbsp;&nbsp;input [1:0] command,<br>
          &nbsp;&nbsp;output reg [1:0] state<br>
          );<br>
          <br>
          &nbsp;&nbsp;// These cannot be changed from outside<br>
          &nbsp;&nbsp;localparam IDLE = 2'b00;<br>
          &nbsp;&nbsp;localparam ACTIVE = 2'b01;<br>
          &nbsp;&nbsp;localparam BUSY = 2'b10;<br>
          &nbsp;&nbsp;localparam ERROR = 2'b11;<br>
          <br>
          &nbsp;&nbsp;always @(posedge clk or posedge reset) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (reset)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state <= IDLE;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;else<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case (state)<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IDLE: state <= (command == 2'b01) ? ACTIVE : IDLE;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ACTIVE: state <= (command == 2'b10) ? BUSY : ACTIVE;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BUSY: state <= (command == 2'b11) ? ERROR : BUSY;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ERROR: state <= (command == 2'b00) ? IDLE : ERROR;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;endcase<br>
          &nbsp;&nbsp;end<br>
          endmodule
        </div>
        
        <p>Use <code>localparam</code> for internal constants that should never be changed externally.</p>
        
        <h4>Using defparam (Deprecated)</h4>
        <p>The <code>defparam</code> statement allows parameter values to be modified from outside a module, but it's now considered deprecated:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module top_module;<br>
          &nbsp;&nbsp;// Instantiate counter with default parameters<br>
          &nbsp;&nbsp;counter counter_inst(...);<br>
          <br>
          &nbsp;&nbsp;// Override parameters after instantiation (NOT recommended)<br>
          &nbsp;&nbsp;defparam counter_inst.WIDTH = 16;<br>
          &nbsp;&nbsp;defparam counter_inst.MAX_COUNT = 65535;<br>
          endmodule
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Best Practices for Constants and Parameters</h4>
          <ul>
            <li>Use <code>parameter</code> for module-level constants that might need to be changed during instantiation</li>
            <li>Use <code>localparam</code> for internal constants that should never be changed externally</li>
            <li>Use named parameter assignment for clarity</li>
            <li>Avoid <code>defparam</code> as it's less maintainable and harder to trace</li>
            <li>Use uppercase for parameter names to distinguish them from variables</li>
            <li>Document the purpose and units of parameters</li>
          </ul>
        </div>
      `
    },
    {
      id: "4.4",
      title: "Key Takeaways",
      content: `
        <h3>Summary: Verilog Operators, Expressions, and Data Types</h3>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #6a0dad; margin: 20px 0;">
          <h4>Key Points</h4>
          <ul>
            <li>Verilog provides a rich set of operators for data manipulation, including arithmetic, logical, bitwise, reduction, and shift operators.</li>
            <li>The <code>signed</code> keyword affects how operators interpret and process values, especially important for arithmetic operations and comparisons.</li>
            <li>Constants and parameters make code more readable, maintainable, and configurable, with <code>parameter</code> allowing override during instantiation and <code>localparam</code> for fixed internal constants.</li>
            <li>Understanding operator precedence and type conversion is critical for writing correct and efficient code.</li>
          </ul>
        </div>
        
        <h3>What's Next?</h3>
        <p>Now that you understand Verilog's operators, expressions, and data types in depth, we'll explore procedural blocks and control flow in the next chapter. You'll learn how to use <code>always</code> blocks, conditional statements, loops, and other control structures to create more complex and dynamic hardware behavior.</p>
        
        <h3>Reflection Questions</h3>
        <ol>
          <li>How would you determine if a 16-bit word has an odd number of '1' bits? Which operators would be most useful?</li>
          <li>What are the potential issues when mixing signed and unsigned values in arithmetic operations?</li>
          <li>How would you design a parameterized module that works with different data widths? What parameters would you include?</li>
        </ol>
      `
    }
  ],
  quiz: {
    title: "Operators, Expressions, and Data Types Quiz",
    description: "Test your understanding of Verilog's operators, expressions, and data type concepts",
    questions: [
      {
        id: "q4_1",
        question: "What is the value of the expression: 4'b1010 & 4'b1100",
        options: [
          { id: "a", text: "4'b1110" },
          { id: "b", text: "4'b1000" },
          { id: "c", text: "4'b0010" },
          { id: "d", text: "4'b1111" }
        ],
        correctAnswer: "b",
        explanation: "The bitwise AND operation (&) performs a bit-by-bit AND. 1010 AND 1100 = 1000, since only the leftmost bit is 1 in both operands."
      },
      {
        id: "q4_2",
        question: "What is the difference between '&' and '&&' operators in Verilog?",
        options: [
          { id: "a", text: "No difference, they are interchangeable" },
          { id: "b", text: "'&' is a bitwise AND, '&&' is a logical AND" },
          { id: "c", text: "'&' is a reduction operator, '&&' is a bitwise operator" },
          { id: "d", text: "'&' is used for integer values, '&&' is used for real values" }
        ],
        correctAnswer: "b",
        explanation: "The '&' operator is a bitwise AND that operates on each bit position, while '&&' is a logical AND that treats non-zero values as true and returns either 1 or 0."
      },
      {
        id: "q4_3",
        question: "What does the reduction operator '|' do when applied to a 4-bit value?",
        options: [
          { id: "a", text: "Returns the OR of each bit with its adjacent bit" },
          { id: "b", text: "Returns logical 1 if any bit in the operand is 1" },
          { id: "c", text: "Returns a 4-bit value with all bits set to the same value" },
          { id: "d", text: "Returns the OR of the 4-bit value with 1" }
        ],
        correctAnswer: "b",
        explanation: "The reduction OR operator '|' performs an OR operation across all bits of its operand. It returns 1 if any bit is 1, otherwise it returns 0."
      },
      {
        id: "q4_4",
        question: "What is the value of the expression: 3'b101 << 2",
        options: [
          { id: "a", text: "3'b100" },
          { id: "b", text: "5'b10100" },
          { id: "c", text: "3'b000" },
          { id: "d", text: "3'b010" }
        ],
        correctAnswer: "c",
        explanation: "The left shift operator (<<) shifts bits to the left. 3'b101 shifted left by 2 would be 3'b10100, but since the result is constrained to 3 bits, the overflow bits are lost, resulting in 3'b000."
      },
      {
        id: "q4_5",
        question: "What is the result of the following operation in Verilog: 4'sb1000 >>> 1",
        options: [
          { id: "a", text: "4'b0100" },
          { id: "b", text: "4'b1100" },
          { id: "c", text: "4'b0000" },
          { id: "d", text: "4'b1110" }
        ],
        correctAnswer: "b",
        explanation: "The arithmetic right shift (>>>) preserves the sign bit. When 4'sb1000 (-8 in decimal) is shifted right by 1, the sign bit (1) is duplicated, resulting in 4'b1100 (-4 in decimal)."
      },
      {
        id: "q4_6",
        question: "What's the difference between 'parameter' and 'localparam' in Verilog?",
        options: [
          { id: "a", text: "'parameter' is for global constants, 'localparam' is for module-specific constants" },
          { id: "b", text: "'parameter' values can be overridden during module instantiation, 'localparam' values cannot" },
          { id: "c", text: "'parameter' is available in all Verilog versions, 'localparam' was introduced in Verilog-2001" },
          { id: "d", text: "'parameter' is used with integers, 'localparam' is used with strings and arrays" }
        ],
        correctAnswer: "b",
        explanation: "The key difference is that 'parameter' values can be overridden when instantiating a module, whereas 'localparam' values are fixed and cannot be changed from outside the module."
      },
      {
        id: "q4_7",
        question: "What is the result of the expression: -8'd5 / 3",
        options: [
          { id: "a", text: "-1" },
          { id: "b", text: "-2" },
          { id: "c", text: "-1.67" },
          { id: "d", text: "-1.5" }
        ],
        correctAnswer: "a",
        explanation: "In Verilog, division of integers results in an integer. -5 divided by 3 equals -1.67, but the fractional part is truncated, resulting in -1."
      },
      {
        id: "q4_8",
        question: "What is the value of {3'b101, 2'b10}?",
        options: [
          { id: "a", text: "5'b10110" },
          { id: "b", text: "6'b000101" },
          { id: "c", text: "5'b10101" },
          { id: "d", text: "5'b10110" }
        ],
        correctAnswer: "d",
        explanation: "The concatenation operator {} combines bit vectors. 3'b101 concatenated with 2'b10 creates a 5-bit vector 5'b10110."
      }
    ]
  }
};

export default chapter4; 