internal class Program
{
    private static void Main(string[] args)
    {
        int SumPostOrder(BTNode? node)
        {
            if (node == null)
            {
                return 0;
            }

            var x = SumPostOrder(node.Left);
            var y = SumPostOrder(node.Right);
            return x + y + node.Data;
        }

        var bt = new BTNode(5);
        bt.Left = new BTNode(2);
        bt.Right = new BTNode(3);

        SumPostOrder(bt);
    }
}

class BTNode
    {
        public int Data;
        public BTNode? Left;
        public BTNode? Right;

        public BTNode(int data = 0, BTNode? left = null, BTNode? right = null)
        {
            Data = data;
            Left = left;
            Right = right;
        }
    }