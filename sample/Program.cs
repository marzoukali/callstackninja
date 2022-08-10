using Sample;

internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine("Hellooo");
        var bt = new BinaryTree();
        bt.BuildTree(new int[] { 3, 9, 20, 15, 7 }, new int[] { 9, 3, 15, 20, 7 });
    }
}

