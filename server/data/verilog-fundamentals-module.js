const verilogFundamentalsModule = {
  title: "Verilog Fundamentals",
  slug: "verilog-fundamentals",
  description: "Master the basics of Verilog HDL and start your journey in digital design. This comprehensive course covers everything from basic syntax to designing combinational and sequential circuits.",
  category: "basic",
  moduleType: "other",
  content: {
    introduction: `
# Introduction to Verilog HDL

Verilog is a hardware description language (HDL) used to model electronic systems. It is most commonly used in the design and verification of digital circuits at the register-transfer level of abstraction.

## Why Learn Verilog?
- Industry standard for digital design
- Essential skill for FPGA and ASIC development
- Foundation for hardware verification
- Enables efficient implementation of complex digital systems

This module will introduce you to the fundamental concepts of Verilog, providing you with the skills to design simple digital circuits and understand more complex designs.
    `,
    functionality: `
# Verilog Functionality

Verilog allows engineers to describe hardware at different levels of abstraction:

1. **Behavioral Level**: Describes what the circuit does without specifying implementation details
2. **Register Transfer Level (RTL)**: Describes the flow of data between registers
3. **Gate Level**: Describes the design in terms of logic gates
4. **Switch Level**: Describes circuits at the transistor level

Most designs are done at the behavioral or RTL level, which provides a good balance between abstraction and control over the final implementation.

## Key Features of Verilog:
- Concurrent execution model (unlike sequential programming languages)
- Hierarchical design capabilities
- Support for both simulation and synthesis
- Ability to mix different levels of abstraction
    `,
    truthTable: `
# Common Verilog Operators

| Operator Type | Symbols | Description |
|---------------|---------|-------------|
| Arithmetic | +, -, *, /, % | Addition, subtraction, multiplication, division, modulus |
| Relational | >, <, >=, <= | Greater than, less than, etc. |
| Equality | ==, != | Equality and inequality |
| Logical | &&, \|\|, ! | AND, OR, NOT |
| Bitwise | &, \|, ^, ~ | AND, OR, XOR, NOT |
| Reduction | &, ~&, \|, ~\|, ^, ~^ | Operate on a single operand |
| Shift | >>, << | Right shift, left shift |
| Concatenation | {,} | Combine operands |
| Replication | {n{m}} | Replicate m n times |
| Conditional | ?: | Ternary operator |

# Verilog Data Types

| Type | Description | Example |
|------|-------------|---------|
| wire | Used for combinational logic | \`wire a;\` |
| reg | Used for sequential logic | \`reg counter;\` |
| integer | 32-bit signed value | \`integer i;\` |
| real | Floating-point value | \`real delay;\` |
| time | Used for simulation timing | \`time t;\` |
| parameter | Constant value | \`parameter WIDTH=8;\` |
    `,
    logicDiagram: `
# Module Structure

The basic structure of a Verilog module:

\`\`\`verilog
module module_name(
    input  wire input1,
    input  wire input2,
    output wire output1
);
    // Module implementation
    // ...
endmodule
\`\`\`

# Design Flow

The typical Verilog design flow includes:

1. **Specification**: Define what the circuit should do
2. **Design**: Write Verilog code implementing the specification
3. **Simulation**: Test the design using a testbench
4. **Synthesis**: Convert the Verilog code to a netlist
5. **Place and Route**: Map the netlist to the target technology
6. **Verification**: Ensure the implemented design matches the specification
    `,
    exampleCode: `
# Basic Examples

## Simple AND Gate
\`\`\`verilog
module and_gate(
    input  wire a,
    input  wire b,
    output wire y
);
    assign y = a & b;
endmodule
\`\`\`

## 4-bit Counter
\`\`\`verilog
module counter_4bit(
    input  wire clk,
    input  wire reset,
    output reg [3:0] count
);
    always @(posedge clk or posedge reset) begin
        if (reset)
            count <= 4'b0000;
        else
            count <= count + 1;
    end
endmodule
\`\`\`

## Basic Testbench
\`\`\`verilog
module testbench;
    // Inputs as regs
    reg a, b;
    
    // Outputs as wires
    wire y;
    
    // Instantiate the Unit Under Test (UUT)
    and_gate uut (
        .a(a),
        .b(b),
        .y(y)
    );
    
    // Test sequence
    initial begin
        // Initialize inputs
        a = 0; b = 0;
        #10; // Wait 10 time units
        
        a = 0; b = 1;
        #10;
        
        a = 1; b = 0;
        #10;
        
        a = 1; b = 1;
        #10;
        
        $finish; // End simulation
    end
    
    // Monitor changes
    initial begin
        $monitor("Time=%0t: a=%b b=%b y=%b", $time, a, b, y);
    end
endmodule
\`\`\`
    `,
    codingTips: `
# Verilog Best Practices

## Naming Conventions
- Use descriptive names for signals and modules
- Use lowercase for signals and uppercase for parameters/constants
- Use underscores to separate words: \`input_data\`, \`clock_enable\`

## Synchronous Design
- Use synchronous resets when possible
- Avoid mixing positive and negative edge triggers
- Be careful with asynchronous signals

## Coding Style
- Declare all inputs and outputs explicitly
- Use parameters instead of hard-coded values
- Comment your code thoroughly
- Indent properly for readability

## Common Mistakes to Avoid
- Inferring latches unintentionally
- Blocking vs. non-blocking assignment confusion
- Timing violations in sequential circuits
- Ignoring simulation warnings

## Debugging Tips
- Use \`$display\` statements for debugging
- Add assertions to check for unexpected conditions
- Use simulation waveforms to visualize behavior
- Test each module individually before integration
    `,
    applications: `
# Real-World Applications of Verilog

Verilog is used in a wide range of applications:

## Digital Systems Design
- CPUs and microprocessors
- Digital signal processors (DSPs)
- Custom hardware accelerators
- Memory controllers

## Communication Systems
- Ethernet controllers
- Wireless transceivers
- Protocol converters
- Error correction coding

## Consumer Electronics
- Smart TVs and displays
- Gaming consoles
- Digital cameras
- Audio/video processors

## Automotive Electronics
- Engine control units
- Advanced driver-assistance systems
- Infotainment systems
- Battery management systems

## Aerospace and Defense
- Radar signal processing
- Secure communication systems
- Navigation systems
- Flight control computers

Learning Verilog opens doors to careers in these industries and more!
    `
  },
  difficulty: "beginner",
  prerequisites: [],
  relatedModules: [],
  thumbnailImage: "verilog-fundamentals.jpg",
  averageRating: 4.8,
  ratingsCount: 256,
  syllabus: [
    {
      title: "Introduction to Hardware Description Languages",
      topics: [
        "What is a Hardware Description Language?",
        "History of Verilog",
        "Comparison with VHDL",
        "Simulation vs. Synthesis",
        "EDA Tools Overview"
      ]
    },
    {
      title: "Verilog Syntax and Basic Constructs",
      topics: [
        "Verilog File Structure",
        "Comments and Whitespace",
        "Identifiers and Keywords",
        "Numbers and Values",
        "Data Types",
        "Operators"
      ]
    },
    {
      title: "Module Declaration and Instantiation",
      topics: [
        "Module Structure",
        "Port Declarations",
        "Port Connection Methods",
        "Module Hierarchy",
        "Parameter Passing"
      ]
    },
    {
      title: "Combinational Logic Design",
      topics: [
        "Continuous Assignments",
        "Procedural Blocks",
        "If-Else Statements",
        "Case Statements",
        "Blocking Assignments"
      ]
    },
    {
      title: "Sequential Logic Design",
      topics: [
        "Always Blocks",
        "Non-blocking Assignments",
        "Flip-Flops and Latches",
        "Registers",
        "Counters",
        "State Machines"
      ]
    },
    {
      title: "Structural vs. Behavioral Modeling",
      topics: [
        "Behavioral Modeling Techniques",
        "Structural Modeling Techniques",
        "Gate-Level Modeling",
        "Switch-Level Modeling",
        "Mixed-Level Design"
      ]
    },
    {
      title: "Test Bench Development",
      topics: [
        "Test Bench Structure",
        "Stimulus Generation",
        "Response Checking",
        "System Tasks",
        "File I/O",
        "Assertion-Based Verification"
      ]
    }
  ],
  exercises: [
    {
      title: "Basic Logic Gates",
      description: "Implement and test basic logic gates (AND, OR, NOT, XOR, NAND, NOR) in Verilog.",
      difficulty: "beginner",
      instructions: "Create separate modules for each logic gate type with appropriate inputs and outputs. Then create a testbench to verify their functionality.",
      starterCode: `module and_gate(
  input wire a,
  input wire b,
  output wire y
);
  // Your code here

endmodule

// Complete the remaining gate modules`,
      solutionCode: `module and_gate(
  input wire a,
  input wire b,
  output wire y
);
  assign y = a & b;
endmodule

module or_gate(
  input wire a,
  input wire b,
  output wire y
);
  assign y = a | b;
endmodule

module not_gate(
  input wire a,
  output wire y
);
  assign y = ~a;
endmodule

module xor_gate(
  input wire a,
  input wire b,
  output wire y
);
  assign y = a ^ b;
endmodule

module nand_gate(
  input wire a,
  input wire b,
  output wire y
);
  assign y = ~(a & b);
endmodule

module nor_gate(
  input wire a,
  input wire b,
  output wire y
);
  assign y = ~(a | b);
endmodule`,
      testCases: [
        {
          input: "a=0, b=0",
          expectedOutput: "and=0, or=0, not_a=1, xor=0, nand=1, nor=1",
          description: "Test with both inputs 0"
        },
        {
          input: "a=0, b=1",
          expectedOutput: "and=0, or=1, not_a=1, xor=1, nand=1, nor=0",
          description: "Test with a=0, b=1"
        },
        {
          input: "a=1, b=0",
          expectedOutput: "and=0, or=1, not_a=0, xor=1, nand=1, nor=0",
          description: "Test with a=1, b=0"
        },
        {
          input: "a=1, b=1",
          expectedOutput: "and=1, or=1, not_a=0, xor=0, nand=0, nor=0",
          description: "Test with both inputs 1"
        }
      ],
      hints: [
        {
          text: "Use the assign statement for continuous assignment in combinational logic",
          cost: 5
        },
        {
          text: "Remember that the '~' operator is used for bitwise negation",
          cost: 5
        }
      ],
      points: 10
    },
    {
      title: "2-to-1 Multiplexer",
      description: "Design a 2-to-1 multiplexer that selects between two input signals based on a selector signal.",
      difficulty: "beginner",
      instructions: "Create a module for a 2-to-1 multiplexer with two data inputs (a and b), one select input (sel), and one output (y). When sel is 0, output should be a; when sel is 1, output should be b.",
      starterCode: `module mux_2to1(
  input wire a,
  input wire b,
  input wire sel,
  output wire y
);
  // Your code here

endmodule`,
      solutionCode: `module mux_2to1(
  input wire a,
  input wire b,
  input wire sel,
  output wire y
);
  assign y = sel ? b : a;
endmodule`,
      testCases: [
        {
          input: "a=0, b=0, sel=0",
          expectedOutput: "y=0",
          description: "Select a, both inputs 0"
        },
        {
          input: "a=0, b=1, sel=0",
          expectedOutput: "y=0",
          description: "Select a, a=0, b=1"
        },
        {
          input: "a=1, b=0, sel=0",
          expectedOutput: "y=1",
          description: "Select a, a=1, b=0"
        },
        {
          input: "a=0, b=1, sel=1",
          expectedOutput: "y=1",
          description: "Select b, a=0, b=1"
        }
      ],
      hints: [
        {
          text: "You can use the ternary operator (condition ? if_true : if_false) for simple multiplexing",
          cost: 10
        },
        {
          text: "Alternatively, you can use an if-else statement in an always block, but remember to declare the output as 'reg' in that case",
          cost: 15
        }
      ],
      points: 15
    },
    {
      title: "4-bit Counter with Enable",
      description: "Design a 4-bit binary counter with synchronous reset and enable signals.",
      difficulty: "intermediate",
      instructions: "Create a 4-bit counter that increments on each clock cycle when enable is high. The counter should reset to 0 when reset is high, regardless of the enable signal.",
      starterCode: `module counter_4bit(
  input wire clk,
  input wire reset,
  input wire enable,
  output reg [3:0] count
);
  // Your code here

endmodule`,
      solutionCode: `module counter_4bit(
  input wire clk,
  input wire reset,
  input wire enable,
  output reg [3:0] count
);
  always @(posedge clk) begin
    if (reset)
      count <= 4'b0000;
    else if (enable)
      count <= count + 1;
  end
endmodule`,
      testCases: [
        {
          input: "reset=1, enable=X",
          expectedOutput: "count=0",
          description: "Reset condition"
        },
        {
          input: "reset=0, enable=0, count=5",
          expectedOutput: "count=5",
          description: "Counter disabled, should maintain value"
        },
        {
          input: "reset=0, enable=1, count=5",
          expectedOutput: "count=6",
          description: "Counter enabled, should increment"
        },
        {
          input: "reset=0, enable=1, count=15",
          expectedOutput: "count=0",
          description: "Counter overflow condition"
        }
      ],
      hints: [
        {
          text: "Use non-blocking assignments (<=) in sequential logic for proper operation",
          cost: 10
        },
        {
          text: "Remember to check the reset condition first, then the enable condition",
          cost: 15
        }
      ],
      points: 20
    },
    {
      title: "Simple D Flip-Flop",
      description: "Implement a D flip-flop with asynchronous reset.",
      difficulty: "beginner",
      instructions: "Create a D flip-flop that stores the input value on the positive edge of the clock and resets to 0 when reset is high, regardless of the clock.",
      starterCode: `module d_flip_flop(
  input wire clk,
  input wire reset,
  input wire d,
  output reg q
);
  // Your code here

endmodule`,
      solutionCode: `module d_flip_flop(
  input wire clk,
  input wire reset,
  input wire d,
  output reg q
);
  always @(posedge clk or posedge reset) begin
    if (reset)
      q <= 1'b0;
    else
      q <= d;
  end
endmodule`,
      testCases: [
        {
          input: "reset=1, d=X",
          expectedOutput: "q=0",
          description: "Asynchronous reset condition"
        },
        {
          input: "reset=0, d=0, clk=↑",
          expectedOutput: "q=0",
          description: "Store 0 on clock edge"
        },
        {
          input: "reset=0, d=1, clk=↑",
          expectedOutput: "q=1",
          description: "Store 1 on clock edge"
        },
        {
          input: "reset=0, d changes after clock edge",
          expectedOutput: "q unchanged",
          description: "Value only changes on clock edge"
        }
      ],
      hints: [
        {
          text: "For asynchronous reset, include 'posedge reset' in the sensitivity list",
          cost: 10
        },
        {
          text: "The sensitivity list syntax is: always @(posedge clk or posedge reset)",
          cost: 15
        }
      ],
      points: 15
    },
    {
      title: "Binary to Gray Code Converter",
      description: "Implement a combinational circuit that converts binary code to Gray code.",
      difficulty: "intermediate",
      instructions: "Create a module that takes a 4-bit binary input and outputs the corresponding 4-bit Gray code. Gray code has the property that adjacent numbers differ by only one bit.",
      starterCode: `module bin_to_gray(
  input wire [3:0] binary,
  output wire [3:0] gray
);
  // Your code here

endmodule`,
      solutionCode: `module bin_to_gray(
  input wire [3:0] binary,
  output wire [3:0] gray
);
  assign gray[3] = binary[3];
  assign gray[2] = binary[3] ^ binary[2];
  assign gray[1] = binary[2] ^ binary[1];
  assign gray[0] = binary[1] ^ binary[0];
endmodule`,
      testCases: [
        {
          input: "binary=0000",
          expectedOutput: "gray=0000",
          description: "Binary 0 to Gray code"
        },
        {
          input: "binary=0001",
          expectedOutput: "gray=0001",
          description: "Binary 1 to Gray code"
        },
        {
          input: "binary=0010",
          expectedOutput: "gray=0011",
          description: "Binary 2 to Gray code"
        },
        {
          input: "binary=1010",
          expectedOutput: "gray=1111",
          description: "Binary 10 to Gray code"
        }
      ],
      hints: [
        {
          text: "The MSB of Gray code is the same as the MSB of binary",
          cost: 10
        },
        {
          text: "Each other bit of Gray code is the XOR of the corresponding binary bit and the next higher binary bit",
          cost: 15
        }
      ],
      points: 20
    },
    {
      title: "Traffic Light Controller",
      description: "Design a simple finite state machine (FSM) for a traffic light controller.",
      difficulty: "advanced",
      instructions: "Create a traffic light controller with three states: Green, Yellow, and Red. The light should cycle through these states with appropriate timing. Include a reset signal to set the state to Red.",
      starterCode: `module traffic_light(
  input wire clk,
  input wire reset,
  output reg [1:0] state
);
  // Define state encodings
  parameter GREEN = 2'b00;
  parameter YELLOW = 2'b01;
  parameter RED = 2'b10;
  
  // Define timing (in clock cycles)
  parameter GREEN_TIME = 8;
  parameter YELLOW_TIME = 3;
  parameter RED_TIME = 10;
  
  // Your code here
  
endmodule`,
      solutionCode: `module traffic_light(
  input wire clk,
  input wire reset,
  output reg [1:0] state
);
  // Define state encodings
  parameter GREEN = 2'b00;
  parameter YELLOW = 2'b01;
  parameter RED = 2'b10;
  
  // Define timing (in clock cycles)
  parameter GREEN_TIME = 8;
  parameter YELLOW_TIME = 3;
  parameter RED_TIME = 10;
  
  reg [3:0] counter;
  
  always @(posedge clk or posedge reset) begin
    if (reset) begin
      state <= RED;
      counter <= 0;
    end
    else begin
      case (state)
        GREEN: begin
          if (counter >= GREEN_TIME - 1) begin
            state <= YELLOW;
            counter <= 0;
          end
          else
            counter <= counter + 1;
        end
        
        YELLOW: begin
          if (counter >= YELLOW_TIME - 1) begin
            state <= RED;
            counter <= 0;
          end
          else
            counter <= counter + 1;
        end
        
        RED: begin
          if (counter >= RED_TIME - 1) begin
            state <= GREEN;
            counter <= 0;
          end
          else
            counter <= counter + 1;
        end
        
        default: begin
          state <= RED;
          counter <= 0;
        end
      endcase
    end
  end
endmodule`,
      testCases: [
        {
          input: "reset=1",
          expectedOutput: "state=RED, counter=0",
          description: "Reset condition"
        },
        {
          input: "state=GREEN, counter=7, reset=0",
          expectedOutput: "state=YELLOW, counter=0",
          description: "Transition from GREEN to YELLOW"
        },
        {
          input: "state=YELLOW, counter=2, reset=0",
          expectedOutput: "state=RED, counter=0",
          description: "Transition from YELLOW to RED"
        },
        {
          input: "state=RED, counter=9, reset=0",
          expectedOutput: "state=GREEN, counter=0",
          description: "Transition from RED to GREEN"
        }
      ],
      hints: [
        {
          text: "Use a case statement to handle different states",
          cost: 15
        },
        {
          text: "You need a counter to keep track of how long each state has been active",
          cost: 20
        },
        {
          text: "Remember to reset the counter when changing states",
          cost: 15
        }
      ],
      points: 30
    },
    {
      title: "Testbench for a Half Adder",
      description: "Create a comprehensive testbench to verify a half adder circuit.",
      difficulty: "beginner",
      instructions: "Write a testbench to test a half adder module. The half adder has two inputs (a and b) and two outputs (sum and carry).",
      starterCode: `// Half adder module (this is already implemented)
module half_adder(
  input wire a,
  input wire b,
  output wire sum,
  output wire carry
);
  assign sum = a ^ b;
  assign carry = a & b;
endmodule

// Your testbench
module half_adder_tb;
  // Your code here
  
endmodule`,
      solutionCode: `// Half adder module (this is already implemented)
module half_adder(
  input wire a,
  input wire b,
  output wire sum,
  output wire carry
);
  assign sum = a ^ b;
  assign carry = a & b;
endmodule

// Your testbench
module half_adder_tb;
  // Declare testbench variables
  reg a, b;
  wire sum, carry;
  
  // Instantiate the half adder
  half_adder dut (
    .a(a),
    .b(b),
    .sum(sum),
    .carry(carry)
  );
  
  // Setup monitoring
  initial begin
    $monitor("Time=%0t: a=%b b=%b sum=%b carry=%b", $time, a, b, sum, carry);
  end
  
  // Apply test vectors
  initial begin
    // Test case 1: a=0, b=0
    a = 0; b = 0;
    #10;
    
    // Test case 2: a=0, b=1
    a = 0; b = 1;
    #10;
    
    // Test case 3: a=1, b=0
    a = 1; b = 0;
    #10;
    
    // Test case 4: a=1, b=1
    a = 1; b = 1;
    #10;
    
    // End simulation
    $finish;
  end
endmodule`,
      testCases: [
        {
          input: "N/A",
          expectedOutput: "All test cases run with proper monitoring",
          description: "Complete testbench structure"
        },
        {
          input: "a=0, b=0",
          expectedOutput: "sum=0, carry=0",
          description: "Test case 1"
        },
        {
          input: "a=0, b=1",
          expectedOutput: "sum=1, carry=0",
          description: "Test case 2"
        },
        {
          input: "a=1, b=1",
          expectedOutput: "sum=0, carry=1",
          description: "Test case 4"
        }
      ],
      hints: [
        {
          text: "Inputs to the design under test (DUT) should be declared as reg in the testbench",
          cost: 10
        },
        {
          text: "Use the $monitor system task to print values whenever they change",
          cost: 15
        },
        {
          text: "Use the #10 delay notation to wait between test cases",
          cost: 10
        }
      ],
      points: 20
    }
  ]
};

module.exports = verilogFundamentalsModule; 