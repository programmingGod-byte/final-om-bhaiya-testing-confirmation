const chapter7 = {
  id: 7,
  title: "Control Hazards and Branch Prediction",
  description: "Understanding and mitigating control flow challenges in pipelined processors",
  estimatedTime: "3 hours",
  completed: false,
  sections: [
    {
      id: "7.1",
      title: "Control Hazards in Pipelines",
      content: `
        <h3>The Branching Problem</h3>
        <p>Control hazards occur when the flow of instruction execution changes unexpectedly, primarily due to branch and jump instructions. These hazards can significantly impact pipeline performance.</p>
        
        <h4>The Branching Dilemma</h4>
        <p>In a pipelined processor, branch instructions pose a fundamental challenge:</p>
        <ul>
          <li>The decision to branch or not (and the branch target) isn't known until the branch is executed</li>
          <li>This typically happens in the EX stage (cycle 3) in a 5-stage pipeline</li>
          <li>By this time, the processor has already fetched and perhaps begun processing instructions from after the branch</li>
          <li>If the branch is taken, these instructions must be discarded, causing pipeline bubbles</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/tYVoeSb.png" alt="Branch Hazard" style="max-width: 700px; width: 100%;">
          <p><em>Control hazard caused by a taken branch</em></p>
        </div>
        
        <h4>Branch Penalty</h4>
        <p>The cost of a taken branch without any mitigation strategies is significant:</p>
        <ul>
          <li><strong>Branch Resolution Stage</strong>: The stage where the branch decision is made (typically EX)</li>
          <li><strong>Branch Penalty</strong>: Number of cycles wasted due to the control hazard</li>
          <li><strong>Penalty Formula</strong>: Penalty = Branch Resolution Stage - 1</li>
          <li><strong>Example</strong>: In a 5-stage pipeline with branch resolution in EX (stage 3), the penalty is 2 cycles</li>
        </ul>
        
        <h4>Branch Performance Impact</h4>
        <p>Control hazards can have a dramatic effect on pipeline performance:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Metric</th>
            <th>Impact</th>
          </tr>
          <tr>
            <td>Frequency of Branches</td>
            <td>Typically 15-30% of dynamic instructions in most programs</td>
          </tr>
          <tr>
            <td>Branch Taken Frequency</td>
            <td>~60% of branches are taken on average</td>
          </tr>
          <tr>
            <td>CPI Impact</td>
            <td>Without mitigation: +0.2 to +0.5 CPI due to control hazards</td>
          </tr>
          <tr>
            <td>Performance Loss</td>
            <td>Up to 30% performance reduction in branch-heavy code</td>
          </tr>
        </table>
        
        <h4>Types of Control Transfer Instructions</h4>
        <p>Different types of control instructions have varying impacts on the pipeline:</p>
        <ul>
          <li><strong>Conditional Branches</strong> (beq, bne, blt, etc.): Decision depends on register values</li>
          <li><strong>Unconditional Jumps</strong> (j, jal): Always change control flow, but target is known early</li>
          <li><strong>Indirect Jumps</strong> (jalr): Target address comes from a register, known only after register read</li>
          <li><strong>Function Returns</strong>: Special case of indirect jumps, usually returning to the calling point</li>
        </ul>
        
        <p>Each type requires potentially different mitigation strategies for optimal performance.</p>
      `
    },
    {
      id: "7.2",
      title: "Basic Branch Handling Techniques",
      content: `
        <h3>Simple Approaches to Control Hazards</h3>
        <p>Before exploring advanced branch prediction, let's examine simpler techniques for handling control hazards.</p>
        
        <h4>1. Stall Until Branch Resolution</h4>
        <p>The simplest approach is to stall the pipeline until the branch outcome is known:</p>
        <ul>
          <li>Freeze the fetch stage until the branch target is known</li>
          <li>Resume fetching from the correct path once decided</li>
          <li>This guarantees correct execution but incurs the full branch penalty</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/q2LPDYr.png" alt="Branch Stall" style="max-width: 700px; width: 100%;">
          <p><em>Pipeline stall until branch resolution</em></p>
        </div>
        
        <h4>2. Predict-Not-Taken</h4>
        <p>Always assume branches are not taken and continue sequential execution:</p>
        <ul>
          <li>Continue fetching instructions after the branch</li>
          <li>If branch turns out to be taken, flush the pipeline and fetch from branch target</li>
          <li>No penalty for not-taken branches, full penalty for taken branches</li>
        </ul>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
// Simplified branch handling with predict-not-taken
if (EX_stage.is_branch && EX_stage.branch_taken) begin
    // Branch is taken, flush pipeline
    IF_ID_register <= 0;  // Clear instruction in decode
    ID_EX_register <= 0;  // Clear instruction in execute
    PC <= EX_stage.branch_target;  // Jump to branch target
end else begin
    // Normal sequential execution
    PC <= PC + 4;
end</pre>
        
        <h4>3. Predict-Taken</h4>
        <p>Always assume branches are taken and fetch from the branch target:</p>
        <ul>
          <li>Calculate branch target address early (in ID stage)</li>
          <li>Begin fetching from predicted branch target</li>
          <li>If branch turns out not to be taken, flush the pipeline and resume sequential path</li>
          <li>No penalty for taken branches, full penalty for not-taken branches</li>
        </ul>
        
        <h4>4. Delayed Branches</h4>
        <p>Rearrange code to make productive use of the branch delay slots:</p>
        <ul>
          <li>Define N "delay slots" after each branch (instructions that always execute)</li>
          <li>The compiler places useful instructions in these slots</li>
          <li>The processor always executes these instructions regardless of branch outcome</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/GHkdvlX.png" alt="Delayed Branch" style="max-width: 600px; width: 100%;">
          <p><em>Branch delay slots filled with useful instructions</em></p>
        </div>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
// Original code:          // With delay slot:
beq x1, x2, target         beq x1, x2, target
add x3, x4, x5             sub x7, x8, x9        // Delay slot (always executes)
sub x7, x8, x9             add x3, x4, x5
                          
target:                    target:
lw  x10, 0(x11)            lw  x10, 0(x11)</pre>
        
        <h4>Comparing Basic Approaches</h4>
        <p>Each approach has different performance characteristics:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Approach</th>
            <th>Advantages</th>
            <th>Disadvantages</th>
          </tr>
          <tr>
            <td>Stall Until Resolution</td>
            <td>Simple hardware, predictable behavior</td>
            <td>Always incurs full branch penalty</td>
          </tr>
          <tr>
            <td>Predict-Not-Taken</td>
            <td>Simple, works well for loop exit branches</td>
            <td>Poor for loops and if-then-else structures</td>
          </tr>
          <tr>
            <td>Predict-Taken</td>
            <td>Works well for loops and backward branches</td>
            <td>Poor for forward branches, requires early target calculation</td>
          </tr>
          <tr>
            <td>Delayed Branches</td>
            <td>No penalty with good compiler support</td>
            <td>Complicates ISA, limited scalability, compiler challenge</td>
          </tr>
        </table>
        
        <p>While these basic approaches help, they don't address the fundamental unpredictability of branches. This limitation motivates more sophisticated branch prediction techniques.</p>
      `
    },
    {
      id: "7.3",
      title: "Dynamic Branch Prediction",
      content: `
        <h3>Adaptive Branch Prediction</h3>
        <p>Dynamic branch prediction uses runtime behavior to predict future branch outcomes, adapting to program patterns during execution.</p>
        
        <h4>Branch History Table (BHT)</h4>
        <p>A simple dynamic predictor uses a table indexed by branch address:</p>
        <ul>
          <li>Each entry stores a prediction bit (or bits) for a particular branch</li>
          <li>Predictions are updated based on actual branch outcomes</li>
          <li>Multiple branches may map to the same entry (aliasing)</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/ZcK4GnQ.png" alt="Branch History Table" style="max-width: 600px; width: 100%;">
          <p><em>Branch History Table structure</em></p>
        </div>
        
        <h4>1-Bit Predictor</h4>
        <p>The simplest dynamic predictor uses a single bit per branch:</p>
        <ul>
          <li>If the branch was taken last time, predict taken</li>
          <li>If the branch was not taken last time, predict not taken</li>
          <li>Update the prediction bit after each branch resolution</li>
        </ul>
        
        <p>While simple, 1-bit predictors struggle with loop branches:</p>
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
// Loop with 9 iterations
loop: 
    // loop body
    beq x1, x9, exit   // Exit when x1 == 9
    addi x1, x1, 1     // Increment counter
    j loop             // Jump back to start
exit:
    // continue execution

// For the branch 'beq x1, x9, exit':
// Iterations 1-8: Not Taken (mispredicts on iteration 2-8 after seeing first "not taken")
// Iteration 9: Taken (mispredicts because last time was "not taken")
// Total: 8 mispredictions out of 9 branches!</pre>
        
        <h4>2-Bit Predictors</h4>
        <p>To address the loop exit problem, 2-bit predictors use a state machine with hysteresis:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/9KlLd3G.png" alt="2-Bit Predictor" style="max-width: 500px; width: 100%;">
          <p><em>2-bit predictor state transition diagram</em></p>
        </div>
        
        <ul>
          <li>Four states: Strongly Not Taken, Weakly Not Taken, Weakly Taken, Strongly Taken</li>
          <li>Requires two consecutive wrong predictions to change the prediction direction</li>
          <li>Works well for loop exit branches (only misses the actual exit and the first iteration)</li>
        </ul>
        
        <h4>Correlating Predictors</h4>
        <p>Some branches are correlated with previous branch outcomes. Correlating predictors use recent branch history to improve predictions:</p>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
// Example where prediction depends on previous branches
if (x1 < 5) {         // Branch A
    // Some code
}
if (x1 > 3) {         // Branch B - correlated with Branch A
    // Some code
}</pre>
        
        <p>A (2,2) correlating predictor:</p>
        <ul>
          <li>Uses 2 bits of global branch history</li>
          <li>Combined with the branch address to index the prediction table</li>
          <li>Each branch has 4 different prediction entries based on history</li>
          <li>Can learn patterns like "if the last branch was taken, this one is likely not taken"</li>
        </ul>
        
        <h4>Tournament Predictors</h4>
        <p>Different predictors work better for different branches. Tournament predictors combine multiple prediction strategies:</p>
        <ul>
          <li>Maintain multiple predictors (e.g., local history and global history)</li>
          <li>Use a meta-predictor to select which prediction to use for each branch</li>
          <li>The meta-predictor learns which strategy works best for each branch</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/xsA7mh6.png" alt="Tournament Predictor" style="max-width: 600px; width: 100%;">
          <p><em>Tournament predictor combining multiple strategies</em></p>
        </div>
        
        <h4>Prediction Accuracy</h4>
        <p>Modern branch predictors achieve impressive accuracy:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Predictor Type</th>
            <th>Typical Accuracy</th>
          </tr>
          <tr>
            <td>Static (Always Not Taken/Taken)</td>
            <td>60-70%</td>
          </tr>
          <tr>
            <td>1-Bit Dynamic</td>
            <td>80-85%</td>
          </tr>
          <tr>
            <td>2-Bit Dynamic</td>
            <td>85-90%</td>
          </tr>
          <tr>
            <td>Correlating (2,2)</td>
            <td>90-95%</td>
          </tr>
          <tr>
            <td>Tournament/Hybrid</td>
            <td>95-98%</td>
          </tr>
          <tr>
            <td>Modern Advanced (Neural, TAGE, etc.)</td>
            <td>>98%</td>
          </tr>
        </table>
        
        <p>Higher prediction accuracy translates directly to better pipeline utilization and performance.</p>
      `
    },
    {
      id: "7.4",
      title: "Branch Target Prediction and Speculation",
      content: `
        <h3>Beyond Outcome Prediction</h3>
        <p>Predicting whether a branch is taken is only part of the solution. The processor also needs to know where to fetch instructions from if the branch is taken.</p>
        
        <h4>Branch Target Buffer (BTB)</h4>
        <p>A Branch Target Buffer caches the targets of previously executed branches:</p>
        <ul>
          <li>Indexed by branch instruction address</li>
          <li>Stores target address of the branch</li>
          <li>Often combined with a branch predictor</li>
          <li>Allows target address to be known at fetch time</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/G4LIqKp.png" alt="Branch Target Buffer" style="max-width: 600px; width: 100%;">
          <p><em>Branch Target Buffer structure and operation</em></p>
        </div>
        
        <p>BTB operation during instruction fetch:</p>
        <ol>
          <li>Check if the PC matches any entry in the BTB</li>
          <li>If hit and prediction is "taken," fetch from the stored target address</li>
          <li>If hit and prediction is "not taken," fetch the next sequential instruction</li>
          <li>If miss, assume "not taken" and fetch the next sequential instruction</li>
        </ol>
        
        <h4>Return Address Stack (RAS)</h4>
        <p>Function calls and returns have predictable behavior that can be exploited:</p>
        <ul>
          <li>A stack of return addresses for nested function calls</li>
          <li>Push the return address on call instructions (jal, jalr used for calls)</li>
          <li>Pop the predicted return address for ret instructions (jalr x0, 0(x1) in RISC-V)</li>
          <li>Particularly effective for deeply nested function calls</li>
        </ul>
        
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
// RISC-V function call and return
main:
    // ...code...
    jal ra, function_a  // Call function_a, ra = return address
    // ...more code...

function_a:
    // ...code...
    jal ra, function_b  // Call function_b, ra = return address
    // ...more code...
    jalr zero, 0(ra)    // Return to caller (main)

function_b:
    // ...code...
    jalr zero, 0(ra)    // Return to caller (function_a)

// Return Address Stack operation:
// 1. jal to function_a: Push PC+4 to RAS
// 2. jal to function_b: Push PC+4 to RAS
// 3. return from function_b: Pop address, predict return to function_a
// 4. return from function_a: Pop address, predict return to main</pre>
        
        <h4>Speculative Execution</h4>
        <p>Modern processors don't just predict branches—they speculatively execute the predicted path:</p>
        <ul>
          <li>Execute instructions along the predicted path before knowing if the prediction is correct</li>
          <li>Maintain processor state that can be restored if prediction is wrong</li>
          <li>Commit results to architectural state only when predictions are confirmed</li>
        </ul>
        
        <h4>Recovery from Misprediction</h4>
        <p>When a branch is mispredicted, the processor must:</p>
        <ol>
          <li>Flush all incorrectly fetched instructions from the pipeline</li>
          <li>Restore the processor state to what it was at the branch</li>
          <li>Begin fetching from the correct path</li>
          <li>Update branch prediction tables to reduce future mispredictions</li>
        </ol>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/sSz4V3R.png" alt="Misprediction Recovery" style="max-width: 700px; width: 100%;">
          <p><em>Pipeline recovery after branch misprediction</em></p>
        </div>
        
        <h4>Branch Prediction in Modern Processors</h4>
        <p>State-of-the-art branch prediction combines multiple techniques:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Component</th>
            <th>Purpose</th>
            <th>Typical Size</th>
          </tr>
          <tr>
            <td>Branch Predictor</td>
            <td>Predict whether branch is taken/not taken</td>
            <td>8-64KB</td>
          </tr>
          <tr>
            <td>Branch Target Buffer</td>
            <td>Store branch target addresses</td>
            <td>4-16KB</td>
          </tr>
          <tr>
            <td>Return Address Stack</td>
            <td>Predict function return addresses</td>
            <td>16-64 entries</td>
          </tr>
          <tr>
            <td>Indirect Branch Predictor</td>
            <td>Predict targets of indirect jumps</td>
            <td>1-4KB</td>
          </tr>
        </table>
        
        <p>These components work together to minimize branch penalties and keep the pipeline full of useful instructions.</p>
      `
    }
  ],
  examples: [
    {
      id: "example7_1",
      title: "2-Bit Predictor Operation",
      description: "Detailed operation of a 2-bit saturating counter branch predictor",
      code: `// Example operation of a 2-bit branch predictor for a loop branch
// States: 00=Strongly Not Taken, 01=Weakly Not Taken, 10=Weakly Taken, 11=Strongly Taken

// Branch at end of loop: beq x1, x10, exit
// Loop iterates 10 times

// Initial state: 00 (Strongly Not Taken)
// We assume a cold predictor that initializes to "Not Taken"

Iteration 1:
  Predict: Not Taken (00)
  Actual: Not Taken
  Correct? Yes
  New state: 00 (Strongly Not Taken)

Iteration 2:
  Predict: Not Taken (00)
  Actual: Not Taken
  Correct? Yes
  New state: 00 (Strongly Not Taken)

// ... same pattern for iterations 3-8 ...

Iteration 9:
  Predict: Not Taken (00)
  Actual: Not Taken
  Correct? Yes
  New state: 00 (Strongly Not Taken)

Iteration 10:
  Predict: Not Taken (00)
  Actual: Taken (loop exit)
  Correct? No
  New state: 01 (Weakly Not Taken)

If the loop runs again:

Iteration 1:
  Predict: Not Taken (01)
  Actual: Not Taken
  Correct? Yes
  New state: 00 (Strongly Not Taken)

// And the pattern repeats...

Analysis:
- The 2-bit predictor mispredicts only the loop exit (last iteration)
- For a loop with N iterations, mispredict rate is 1/N
- Compare to 1-bit predictor which would mispredict the first iteration after exit too
- For frequently executed loops, the 2-bit predictor performs significantly better
- The hysteresis property prevents thrashing on alternating patterns`,
      explanation: "This example traces the behavior of a 2-bit saturating counter branch predictor for a loop branch. The predictor uses four states (Strongly Not Taken, Weakly Not Taken, Weakly Taken, Strongly Taken) and requires two consecutive mispredictions to completely change prediction direction. For the loop branch, the predictor correctly predicts 'not taken' for most iterations. It only mispredicts on the final iteration when the branch is actually taken to exit the loop. Unlike a 1-bit predictor, the 2-bit predictor won't immediately switch to predicting 'taken' after a single taken branch, which helps when the loop is executed multiple times. This demonstrates why 2-bit predictors are more effective for loop-heavy code than simpler 1-bit predictors."
    },
    {
      id: "example7_2",
      title: "Branch Predictor and BTB Implementation",
      description: "Verilog implementation of a simple branch prediction system with branch target buffer",
      code: `module branch_prediction_unit #(
  parameter ADDR_WIDTH = 32,
  parameter BTB_SIZE = 16,  // Branch Target Buffer entries (power of 2)
  parameter BTB_INDEX_BITS = $clog2(BTB_SIZE)
)(
  input  wire                   clk,
  input  wire                   rst_n,
  
  // Fetch stage interface
  input  wire [ADDR_WIDTH-1:0]  fetch_pc,
  output wire                   predict_taken,
  output wire [ADDR_WIDTH-1:0]  predict_target,
  
  // Execute stage feedback
  input  wire                   exec_is_branch,
  input  wire [ADDR_WIDTH-1:0]  exec_pc,
  input  wire                   exec_taken,     // Actual branch outcome
  input  wire [ADDR_WIDTH-1:0]  exec_target     // Actual branch target
);

  // Branch Target Buffer
  reg [ADDR_WIDTH-1:0] btb_tag    [BTB_SIZE-1:0];
  reg [ADDR_WIDTH-1:0] btb_target [BTB_SIZE-1:0];
  reg                  btb_valid  [BTB_SIZE-1:0];
  
  // 2-bit branch direction predictor
  reg [1:0] branch_predictor [BTB_SIZE-1:0];
  
  // Decoder signals
  wire [BTB_INDEX_BITS-1:0] fetch_index = fetch_pc[BTB_INDEX_BITS+1:2];
  wire [BTB_INDEX_BITS-1:0] exec_index = exec_pc[BTB_INDEX_BITS+1:2];
  wire                      fetch_btb_hit;
  
  // BTB hit detection
  assign fetch_btb_hit = btb_valid[fetch_index] && (btb_tag[fetch_index] == fetch_pc);
  
  // Prediction logic
  assign predict_taken = fetch_btb_hit && branch_predictor[fetch_index][1]; // MSB determines taken
  assign predict_target = btb_target[fetch_index];
  
  // Update logic on feedback from execute stage
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      // Reset BTB and predictors
      for (int i = 0; i < BTB_SIZE; i++) begin
        btb_valid[i] <= 1'b0;
        branch_predictor[i] <= 2'b01; // Initialize to Weakly Not Taken
      end
    end else if (exec_is_branch) begin
      // Update BTB entry
      btb_tag[exec_index] <= exec_pc;
      btb_target[exec_index] <= exec_target;
      btb_valid[exec_index] <= 1'b1;
      
      // Update 2-bit saturating counter
      case (branch_predictor[exec_index])
        2'b00: // Strongly Not Taken
          branch_predictor[exec_index] <= exec_taken ? 2'b01 : 2'b00;
        2'b01: // Weakly Not Taken
          branch_predictor[exec_index] <= exec_taken ? 2'b10 : 2'b00;
        2'b10: // Weakly Taken
          branch_predictor[exec_index] <= exec_taken ? 2'b11 : 2'b01;
        2'b11: // Strongly Taken
          branch_predictor[exec_index] <= exec_taken ? 2'b11 : 2'b10;
      endcase
    end
  end

endmodule`,
      explanation: "This Verilog module implements a simple branch prediction system combining a Branch Target Buffer (BTB) with a 2-bit saturating counter predictor. The BTB stores target addresses for branch instructions, indexed by a portion of the branch instruction's address. When the fetch unit encounters a potential branch, it checks the BTB for a matching entry. If found and the predictor indicates 'taken', the fetch unit redirects to the predicted target address. The 2-bit predictor uses the state machine we discussed (Strongly Not Taken, Weakly Not Taken, Weakly Taken, Strongly Taken) to predict branch directions. When branch execution results become available, the module updates both the target address in the BTB and the prediction counter based on the actual outcome. This implementation is simplified for educational purposes—real-world predictors typically use larger tables, more sophisticated indexing, and handling of aliasing issues."
    }
  ],
  quiz: {
    title: "Control Hazards and Branch Prediction Quiz",
    questions: [
      {
        question: "What is the primary cause of control hazards in a pipelined processor?",
        options: [
          "Data dependencies between instructions",
          "Resource conflicts in the pipeline",
          "Branch and jump instructions changing the flow of execution",
          "Memory access latency"
        ],
        correctAnswer: 2,
        explanation: "Control hazards are primarily caused by branch and jump instructions that change the flow of execution. When a branch is encountered, the processor doesn't know which instructions to fetch next until the branch condition is evaluated, which typically happens in later pipeline stages. This creates uncertainty in the instruction stream and can lead to pipeline bubbles or incorrect instruction execution."
      },
      {
        question: "In a 5-stage pipeline where branch conditions are evaluated in the EX stage, what is the branch penalty without any prediction?",
        options: [
          "0 cycles",
          "1 cycle",
          "2 cycles",
          "5 cycles"
        ],
        correctAnswer: 2,
        explanation: "The branch penalty is calculated as (Branch Resolution Stage - 1). In a 5-stage pipeline where branches are resolved in the EX stage (stage 3), the penalty is 3 - 1 = 2 cycles. This means two instructions will have entered the pipeline before the branch outcome is known, and these instructions must be discarded if the branch is taken."
      },
      {
        question: "What is the primary disadvantage of the 'predict-not-taken' approach to branch handling?",
        options: [
          "It requires complex hardware to implement",
          "It performs poorly for loops where branches are usually taken",
          "It can't be implemented in a RISC architecture",
          "It always causes a pipeline stall regardless of the branch outcome"
        ],
        correctAnswer: 1,
        explanation: "The primary disadvantage of the 'predict-not-taken' approach is that it performs poorly for loops, where backward branches (jumping back to the loop start) are usually taken. Since this approach always predicts branches as not taken, it will mispredict most loop iterations except the final exit, leading to significant performance penalties in loop-heavy code."
      },
      {
        question: "What is the main advantage of a 2-bit branch predictor over a 1-bit predictor?",
        options: [
          "It requires less hardware to implement",
          "It can predict indirect jumps more accurately",
          "It prevents prediction thrashing on alternating patterns and handles loop exits better",
          "It always achieves 100% prediction accuracy"
        ],
        correctAnswer: 2,
        explanation: "The main advantage of a 2-bit predictor over a 1-bit predictor is that it prevents prediction thrashing on alternating patterns and handles loop exits better. The 2-bit predictor requires two consecutive mispredictions to change prediction direction, providing hysteresis that makes it more stable for common branch patterns like loops, where a single abnormal outcome (like a loop exit) shouldn't immediately change the prediction strategy."
      },
      {
        question: "What is the purpose of a Branch Target Buffer (BTB)?",
        options: [
          "To predict whether a branch will be taken or not taken",
          "To store the target address of previously executed branches for quick retrieval",
          "To eliminate data hazards in the pipeline",
          "To calculate the branch condition faster"
        ],
        correctAnswer: 1,
        explanation: "The purpose of a Branch Target Buffer (BTB) is to store the target addresses of previously executed branches for quick retrieval. When a potential branch instruction is fetched, the BTB provides the target address immediately, without waiting for the decode stage. This allows the processor to start fetching from the correct path earlier if the branch is predicted taken, reducing the branch penalty."
      },
      {
        question: "What is a correlating branch predictor?",
        options: [
          "A predictor that uses the correlation between different pipeline stages",
          "A predictor that uses the outcomes of previous branches to predict the current branch",
          "A predictor that correlates branch addresses with memory addresses",
          "A predictor that measures the correlation between compiler optimization and branch behavior"
        ],
        correctAnswer: 1,
        explanation: "A correlating branch predictor uses the outcomes of previous branches to predict the current branch. It recognizes that the behavior of some branches is correlated with the behavior of other recent branches. By tracking patterns in branch history (either global history across all branches or local history for specific branches), correlating predictors can achieve higher accuracy than simple predictors that only look at a single branch in isolation."
      },
      {
        question: "What is the purpose of a Return Address Stack (RAS)?",
        options: [
          "To store local variables during function calls",
          "To predict the target addresses of all types of branches",
          "To specifically predict return addresses for function returns",
          "To calculate the stack pointer value for each function"
        ],
        correctAnswer: 2,
        explanation: "A Return Address Stack (RAS) is specifically designed to predict return addresses for function returns. It operates like a hardware stack, pushing the return address (PC+4) when a function call is detected and popping an address when a return instruction is encountered. This specialized mechanism is very effective for nested function calls, which are common in most programs and would be difficult to predict accurately with standard branch prediction mechanisms."
      },
      {
        question: "In most programs, approximately what percentage of dynamic instructions are branches?",
        options: [
          "5-10%",
          "15-30%",
          "40-50%",
          "60-70%"
        ],
        correctAnswer: 1,
        explanation: "In most programs, approximately 15-30% of dynamically executed instructions are branches. This significant percentage means that efficient branch handling is critical for overall processor performance. Even a small improvement in branch prediction accuracy can have a substantial impact on program execution speed."
      },
      {
        question: "What happens during speculative execution when a branch is predicted?",
        options: [
          "The processor stalls until the branch outcome is certain",
          "The processor executes instructions from both possible paths simultaneously",
          "The processor executes instructions along the predicted path before knowing if the prediction is correct",
          "The processor only fetches but never executes instructions from the predicted path"
        ],
        correctAnswer: 2,
        explanation: "During speculative execution, the processor executes instructions along the predicted path before knowing if the prediction is correct. This allows the processor to make forward progress without waiting for branch resolution. However, the results of these speculative instructions are not committed to the architectural state (visible program state) until the branch prediction is confirmed correct. If the prediction turns out wrong, the speculative work is discarded and execution resumes from the correct path."
      },
      {
        question: "What is the main drawback of using delayed branch slots?",
        options: [
          "They significantly increase program code size",
          "They complicate the ISA and create challenges for compilers to fill slots effectively",
          "They cause more data hazards than other approaches",
          "They are impossible to implement in hardware"
        ],
        correctAnswer: 1,
        explanation: "The main drawback of delayed branch slots is that they complicate the Instruction Set Architecture (ISA) and create challenges for compilers to fill the slots effectively. Finding useful instructions to place in branch delay slots without changing program semantics can be difficult, especially with multiple delay slots. This approach also bakes a specific pipeline depth assumption into the ISA, making it harder to change the pipeline design in future processors without breaking backward compatibility."
      }
    ]
  }
};

export default chapter7; 