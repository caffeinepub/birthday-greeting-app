import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type Greeting = {
    recipientName : Text;
    message : Text;
  };

  let greetings = Map.empty<Text, Greeting>();

  public shared ({ caller }) func createGreeting(linkId : Text, recipientName : Text, message : Text) : async () {
    if (greetings.containsKey(linkId)) {
      Runtime.trap("Greeting with this link already exists. ");
    };
    let newGreeting : Greeting = {
      recipientName;
      message;
    };
    greetings.add(linkId, newGreeting);
  };

  public query ({ caller }) func getGreeting(linkId : Text) : async Greeting {
    switch (greetings.get(linkId)) {
      case (?greeting) { greeting };
      case (null) { Runtime.trap("Greeting not found. ") };
    };
  };

  public query ({ caller }) func listAllGreetings() : async [(Text, Greeting)] {
    greetings.entries().toArray();
  };
};
