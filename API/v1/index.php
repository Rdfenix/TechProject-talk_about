<?php
    
    session_start();

    require_once("vendor/autoload.php");

    use \Slim\Slim;
    use \Talk\Model\Post;
    use \Talk\Model\User;
    use \Talk\Model\Search;

    $app = new Slim();
    $app->config('debug', true);

    $app->get('/bemvindo', function(){
        echo "Bem Vindo";
    });

    $app->get('/post/list', function(){
        $post = Post::listPosts();
        echo json_encode($post);
    });

    $app->get('/commentary/list/:id', function($id){
        $comment = new Post();
        $result = $comment->listComments((int) $id);
        echo $result;
    });

    $app->get('/post/:id', function($id){
        $post = new Post();
        $result = $post->getItem((int) $id);
        echo $result;
    });

    $app->post('/post/create', function(){
        $post = new Post();
        $request = Slim::getInstance()->request();
        $result =  json_decode($request->getBody());
        $post->setData($result);
        $data = $post->savePost();
        echo $data;
    });

    $app->post('/user/create', function(){
        $user = new User();
        $request = Slim::getInstance()->request();
        $result =  json_decode($request->getBody());
        $user->setData($result);
        $data = $user->saveUser();
        echo json_encode($data);
    });

    $app->post('/user/login', function(){
        $user = new User();
        $request = Slim::getInstance()->request();
        $result =  json_decode($request->getBody());
        $data = $user->login($result->user, $result->pass);
        echo json_encode($data);
    });

    $app->get('/user/session', function(){
        $user = new User();
        $result = $user->session();
        echo json_encode($result);
    });

    $app->post('/query', function(){
        $search = new Search();
        $request = Slim::getInstance()->request();
        $result =  json_decode($request->getBody());
        $data = $search->search($result);
        echo  json_encode($data);
    });

    $app->post('/commentary', function(){
        $post = new Post();
        $request = Slim::getInstance()->request();
        $result =  json_decode($request->getBody());
        $user->setData($result);
        $data = $user->saveCommentary();
        echo json_encode($data);

    });

    $app->run();
?>
