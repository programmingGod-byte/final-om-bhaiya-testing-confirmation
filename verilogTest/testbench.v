`timescale 1ns / 1ps

module testbench;
  reg A, B;
  wire SUM;

  // Instantiate the top module
  top uut (
    .A(A),
    .B(B),
    .SUM(SUM)
  );

  // Dump the waveform data to a VCD (Value Change Dump) file
  initial begin
    $dumpfile("waveform.vcd");  // File name for the waveform output
    $dumpvars(0, testbench);    // Dump all variables of the testbench module

    // Apply test vectors
    $display("A B | SUM");
    $display("---------");
    A = 0; B = 0; #10;
    $display("%b %b | %b", A, B, SUM);
    A = 0; B = 1; #10;
    $display("%b %b | %b", A, B, SUM);
    A = 1; B = 0; #10;
    $display("%b %b | %b", A, B, SUM);
    A = 1; B = 1; #10;
    $display("%b %b | %b", A, B, SUM);
    $finish;  // End the simulation
  end
endmodule
